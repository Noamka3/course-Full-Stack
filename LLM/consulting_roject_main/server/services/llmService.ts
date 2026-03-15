import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function askLLM(systemPrompt: string, userPrompt: string): Promise<string> {
  const response = await genAI.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: [
      { role: 'model', parts: [{ text: systemPrompt }] },
      { role: 'user', parts: [{ text: userPrompt }] },
    ],
    config: {
      thinkingConfig: {
        thinkingBudget: 0,
      },
    },
  });

  return response.text ?? '';
}

export async function testLLM() {
  try {
    const result = await askLLM('You are helpful', 'Say hello');
    console.log('LLM test result:', result);
  } catch (error) {
    console.error('LLM test error:', error);
  }
}