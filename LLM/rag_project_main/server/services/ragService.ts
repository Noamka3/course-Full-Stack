import { QueryTypes } from 'sequelize';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { loadPDFs } from './pdfLoader';
import { loadArticles } from './articleLoader';
import { loadSlack } from './slackLoader';
import { chunkContentByWords } from './chunker';
import { createEmbedding } from './embeddingService';
import KnowledgeBase from '../models/KnowledgeBase';
import sequelize from '../config/database';
import { DATA_SOURCES, GEMINI_MODEL, LLM_CONFIG } from '../config/constants';

dotenv.config();

export const loadAllData = async () => {
  const existing = await KnowledgeBase.count();
  if (existing > 0) {
    console.log('Knowledge base already populated, skipping...');
    return;
  }

  const [pdfs, articles, slack] = await Promise.all([
    loadPDFs(),
    loadArticles(),
    loadSlack(),
  ]);

  const allSources = [
    ...pdfs.map(d => ({ ...d, source: DATA_SOURCES.PDF })),
    ...articles.map(d => ({ ...d, source: DATA_SOURCES.ARTICLE })),
    ...slack.map(d => ({ ...d, source: DATA_SOURCES.SLACK })),
  ];

  for (const item of allSources) {
    const chunks = chunkContentByWords(item.content);

    for (let i = 0; i < chunks.length; i++) {
      const embedding = await createEmbedding(chunks[i].content);

      await sequelize.query(
        `INSERT INTO knowledge_base (source, source_id, chunk_index, chunk_content, embeddings_768)
         VALUES (:source, :source_id, :chunk_index, :chunk_content, :embedding::vector)`,
        {
          replacements: {
            source: item.source,
            source_id: item.source_id,
            chunk_index: i,
            chunk_content: chunks[i].content,
            embedding: `[${embedding.join(',')}]`,
          },
          type: QueryTypes.INSERT,
        }
      );
    }
  }

  console.log('Knowledge base populated successfully!');
};

export const ask = async (userQuestion: string): Promise<string> => {
  // 1. Embed the question using the same model as loadAllData
  const questionEmbedding = await createEmbedding(userQuestion);
  const embeddingStr = `[${questionEmbedding.join(',')}]`;

  // 2. Similarity search using pgvector cosine distance (<=>)
  const results = await sequelize.query<{ chunk_content: string; source: string; source_id: string }>(
    `SELECT chunk_content, source, source_id
     FROM knowledge_base
     WHERE embeddings_768 IS NOT NULL
     ORDER BY embeddings_768 <=> :embedding::vector
     LIMIT 5`,
    {
      replacements: { embedding: embeddingStr },
      type: QueryTypes.SELECT,
    }
  );

  // 3. Build prompt from retrieved chunks
  const context = results
    .map(r => `[${r.source} | ${r.source_id}]\n${r.chunk_content}`)
    .join('\n\n---\n\n');

  const prompt = `You are a helpful assistant. Answer the user's question based ONLY on the context provided below.
If the answer cannot be found in the context, say so clearly.

Context:
${context}

User Question: ${userQuestion}

Answer:`;

  // 4. Ask Gemini
  const ai = new GoogleGenAI({});
  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: [
      { role: 'user', parts: [{ text: prompt }] },
    ],
    config: {
      thinkingConfig: { thinkingBudget: LLM_CONFIG.thinkingBudget },
    },
  });

  return response.text ?? '';
};
