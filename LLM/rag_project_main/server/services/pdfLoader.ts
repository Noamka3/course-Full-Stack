import fs from 'fs';
import path from 'path';
import { PDFParse } from 'pdf-parse';
import { PDF_FILES } from '../config/constants';

export async function loadPDFs(): Promise<{ source_id: string; content: string }[]> {
  const pdfDir = path.join(process.cwd(), 'knowledge_pdfs');

  const results = [];

  for (const file of PDF_FILES) {
    const buffer = fs.readFileSync(path.join(pdfDir, file));
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    results.push({
      source_id: file,
      content: result.text,
    });
  }

  return results;
}
