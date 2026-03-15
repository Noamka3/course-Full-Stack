import { getCompanyFinancials } from './dbService';
import { getCompanyNews } from './newsApiService';
import { askLLM } from './llmService';

const HIGH_LEVEL_SYSTEM_PROMPT = `You are an investment analyst. Return ONE short sentence with a final recommendation: Invest, Don't Invest, or Defer. Output only Markdown.`;

const DETAILED_SYSTEM_PROMPT = `You are an investment analyst. Write a detailed Markdown report with these sections:
## Executive Summary
## Sales & Profit Snapshot
## News Analysis
## Investment Recommendation (Invest / Don't Invest / Defer)`;

export const generateReportMarkdown = async (
  companyName: string,
  companyId: string,
  reportType: string
): Promise<string> => {
  const [dbData, newsData] = await Promise.all([
    getCompanyFinancials(companyId),
    getCompanyNews(companyId),
  ]);

  const financials = dbData
    ? `Year: ${dbData.year}, Sales: ${dbData.sales}, Profit: ${dbData.profit}`
    : 'No financial data available';

  const news = newsData
    ? JSON.stringify(newsData)
    : 'No news available';

  const systemPrompt = reportType === 'high-level'
    ? HIGH_LEVEL_SYSTEM_PROMPT
    : DETAILED_SYSTEM_PROMPT;


  const userPrompt = `Company: ${companyName} (ID: ${companyId})
    Financials: ${financials}
    News: ${news}`;

  return await askLLM(systemPrompt, userPrompt);
};
