import dotenv from 'dotenv';
dotenv.config();

import { GoogleGenAI } from '@google/genai';
import { Sequelize, QueryTypes } from 'sequelize';

// Test embedding
const ai = new GoogleGenAI({});
console.log('Creating embedding...');
const result = await ai.models.embedContent({
  model: 'gemini-embedding-001',
  contents: 'test chunk of text',
  config: { outputDimensionality: 768 },
});
const embedding = result.embeddings?.[0]?.values ?? [];
console.log('Embedding dims:', embedding.length);

// Test DB connection
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

try {
  await sequelize.authenticate();
  console.log('DB connected');

  // Check table
  const count = await sequelize.query('SELECT COUNT(*) FROM knowledge_base', { type: QueryTypes.SELECT });
  console.log('Current rows:', count[0].count);

  // Test insert
  const embeddingStr = `[${embedding.join(',')}]`;
  await sequelize.query(
    `INSERT INTO knowledge_base (source, source_id, chunk_index, chunk_content, embeddings_768)
     VALUES (:source, :source_id, :chunk_index, :chunk_content, :embedding::vector)`,
    {
      replacements: {
        source: 'test',
        source_id: 'test-1',
        chunk_index: 0,
        chunk_content: 'test chunk of text',
        embedding: embeddingStr,
      },
      type: QueryTypes.INSERT,
    }
  );
  console.log('INSERT succeeded!');

  // Clean up test row
  await sequelize.query("DELETE FROM knowledge_base WHERE source = 'test'");
  console.log('Cleaned up test row');
} catch(e) {
  console.error('DB error:', e.message);
} finally {
  await sequelize.close();
}
