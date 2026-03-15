import axios from 'axios';
import { SLACK_API_URL, SLACK_CHANNELS, PROCESSING_CONFIG } from '../config/constants';

export async function loadSlack(): Promise<{ source_id: string; content: string }[]> {
  const results: { source_id: string; content: string }[] = [];

  for (const channel of SLACK_CHANNELS) {
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await axios.get(SLACK_API_URL, {
        params: { channel, page },
        timeout: PROCESSING_CONFIG.HTTP_TIMEOUT,
      });

      const { items, total, limit } = response.data;

      for (const msg of items) {
        results.push({
          source_id: `${channel}-${msg.id}`,
          content: msg.text,
        });
      }

      hasMore = page * limit < total;
      page++;
      if (hasMore) await new Promise(res => setTimeout(res, 1000));
    }
  }

  return results;
}
