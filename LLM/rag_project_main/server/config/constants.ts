export const GEMINI_MODEL = 'gemini-2.5-flash';

export const LLM_CONFIG = {
  thinkingBudget: 0,
};

export const DATA_SOURCES = {
  PDF: 'pdf',
  ARTICLE: 'article',
  SLACK: 'slack',
};

export const ARTICLE_IDS = [
  'military-deployment-report',
  'urban-commuting',
  'hover-polo',
  'warehousing',
  'consumer-safety',
];

export const GIST_BASE_URL =
  'https://gist.githubusercontent.com/JonaCodes/394d01021d1be03c9fe98cd9696f5cf3/raw';

export const PROCESSING_CONFIG = {
  CHUNK_WORD_COUNT: 400,
  HTTP_TIMEOUT: 10000,
};

export const PDF_FILES = [
  'OpEd - A Revolution at Our Feet.pdf',
  'Research Paper - Gravitational Reversal Physics.pdf',
  'White Paper - The Development of Localized Gravity Reversal Technology.pdf',
];

export const SLACK_CHANNELS = ['lab-notes', 'engineering', 'offtopic'];

export const SLACK_API_URL = 'https://lev-boots-slack-api.jona-581.workers.dev';
