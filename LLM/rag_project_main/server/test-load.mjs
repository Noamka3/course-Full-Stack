import dotenv from 'dotenv';
dotenv.config();

// Test PDF loading with pdf-parse v2
import fs from 'fs';
import path from 'path';
import { PDFParse } from 'pdf-parse';

const pdfDir = path.join(process.cwd(), 'knowledge_pdfs');
console.log('PDF dir:', pdfDir);
console.log('Exists:', fs.existsSync(pdfDir));

const files = fs.readdirSync(pdfDir);
console.log('Files:', files);

// Test one PDF
try {
  const buffer = fs.readFileSync(path.join(pdfDir, files[0]));
  console.log('Buffer size:', buffer.length);
  const parser = new PDFParse({ data: buffer });
  const result = await parser.getText();
  console.log('Text length:', result.text?.length);
  console.log('First 200 chars:', result.text?.slice(0, 200));
} catch(e) {
  console.error('PDF error:', e.message);
  console.error(e.stack);
}
