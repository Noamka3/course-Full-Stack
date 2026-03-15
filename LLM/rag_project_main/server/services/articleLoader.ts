import axios from 'axios';
import { ARTICLE_IDS, GIST_BASE_URL, PROCESSING_CONFIG } from '../config/constants';

export async function loadArticles(): Promise<{ source_id: string; content: string }[]> {
  const fetchPromises = ARTICLE_IDS.map((id: string, index: number) =>
    axios.get(`${GIST_BASE_URL}/article-${index + 1}_${id}.md`, { timeout: PROCESSING_CONFIG.HTTP_TIMEOUT })
      .then(res => ({ source_id: id, content: res.data }))
  );

  const results = await Promise.allSettled(fetchPromises);

  return results
    .filter((r): r is PromiseFulfilledResult<{ source_id: string; content: string }> => r.status === 'fulfilled')
    .map(r => r.value);
}
