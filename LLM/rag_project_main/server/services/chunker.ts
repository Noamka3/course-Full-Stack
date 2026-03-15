import { PROCESSING_CONFIG } from '../config/constants';

export interface ContentChunk {
  content: string;
  wordCount: number;
  startPosition: number;
}

const splitWords = (text: string): string[] => {
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
};

const countWords = (text: string): number => {
  return splitWords(text).length;
};

const splitIntoParagraphs = (content: string): string[] => {
  let paragraphs = content.split(/\n\s*\n/);

  if (paragraphs.length === 1) {
    paragraphs = content.split(/\n/);
  }

  return paragraphs.filter((p) => p.trim().length > 0);
};

const mergeSmallTrailingChunk = (
  chunks: ContentChunk[],
  minTrailingWords: number = 100
): ContentChunk[] => {
  if (chunks.length < 2) return chunks;

  const lastChunk = chunks[chunks.length - 1];
  if (lastChunk.wordCount >= minTrailingWords) return chunks;

  const secondToLast = chunks[chunks.length - 2];
  const mergedChunk: ContentChunk = {
    content: secondToLast.content + '\n\n' + lastChunk.content,
    wordCount: secondToLast.wordCount + lastChunk.wordCount,
    startPosition: secondToLast.startPosition,
  };

  return [...chunks.slice(0, -2), mergedChunk];
};

export const chunkContentByWords = (
  content: string,
  minWordCount: number = PROCESSING_CONFIG.CHUNK_WORD_COUNT
): ContentChunk[] => {
  if (!content.trim()) return [];

  const paragraphs = splitIntoParagraphs(content);
  if (!paragraphs.length) return [];

  const chunks: ContentChunk[] = [];
  let currentChunk = '';
  let currentWordCount = 0;
  let startPosition = 0;

  for (const paragraph of paragraphs) {
    const paragraphWordCount = countWords(paragraph);

    if (currentWordCount > 0 && currentWordCount >= minWordCount) {
      chunks.push({
        content: currentChunk.trim(),
        wordCount: currentWordCount,
        startPosition,
      });

      startPosition += currentChunk.length;
      currentChunk = paragraph;
      currentWordCount = paragraphWordCount;
    } else {
      if (currentChunk) {
        currentChunk += '\n\n' + paragraph;
      } else {
        currentChunk = paragraph;
      }
      currentWordCount += paragraphWordCount;
    }
  }

  if (currentChunk.trim()) {
    chunks.push({
      content: currentChunk.trim(),
      wordCount: currentWordCount,
      startPosition,
    });
  }

  return mergeSmallTrailingChunk(chunks);
};
