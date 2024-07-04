import {getContentful} from '.';
import {ContentfulEntriesApiData} from './types';

export const getFrontPage = async () => {
  try {
    const allEntries = await getContentful<ContentfulEntriesApiData>();
    console.log('got nav data', allEntries);
    return allEntries;
  } catch (error) {
    console.log('getNav error', error);
    return undefined;
  }
};
