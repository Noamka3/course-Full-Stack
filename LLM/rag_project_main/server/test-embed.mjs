import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({});
const r = await ai.models.embedContent({
  model: 'gemini-embedding-001',
  contents: 'test',
  config: { outputDimensionality: 768 },
});
console.log('dims:', r.embeddings?.[0]?.values?.length);
console.log('first 3 values:', r.embeddings?.[0]?.values?.slice(0, 3));
