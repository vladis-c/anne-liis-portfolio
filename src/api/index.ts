import ENTRIES from './entries';
import {Environment} from './types';

const baseUrl = process.env.CONTENTFUL_BASE_URI;
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const currentEnv = process.env.CURRENT_ENV ?? ('development' as Environment);

export const getContentful = async <Data>() => {
  try {
    const res = await fetch(
      `${baseUrl}/spaces/${spaceId}/environments/${currentEnv}/public/entries`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.CONTENTFUL_MANAGEMENT_KEY}`,
        },
        next: {
          tags: [ENTRIES.ENTRIES],
        },
      },
    );
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json() as Data;
  } catch (error) {
    console.log('Error when getting response', error);
    return undefined;
  }
};
