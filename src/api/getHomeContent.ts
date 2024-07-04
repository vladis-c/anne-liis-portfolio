import {getContentful} from '.';
import ENTRIES from './entries';
import {ContentfulEntriesApiData} from './types';

const LANG = 'en-US';

type FrontPageData = {
  navigation: {
    menu: string[];
    name: string;
    contacts: string[];
    bgImage: string;
  };
};

export const getHomeContent = async () => {
  try {
    const allEntries = await getContentful<ContentfulEntriesApiData>();
    // get navigation entry
    // 1. find navigation entry (should be only one)
    const navigationEntry = allEntries?.items.find(
      item => item.sys.contentType.sys.id === ENTRIES.CONTENT_TYPES.NAVIGATION,
    );

    const frontPageData = {
      navigation: {menu: [], name: '', contacts: [], bgImage: ''},
    } as FrontPageData;

    if (navigationEntry) {
      frontPageData.navigation.menu = navigationEntry.fields.menu[LANG];
      frontPageData.navigation.name =
        navigationEntry.fields.name[LANG].content[0].content[0].value;
      frontPageData.navigation.contacts = navigationEntry.fields.contacts[LANG];
      frontPageData.navigation.bgImage = navigationEntry.fields.imageUrl[LANG];
    }
    return frontPageData;
  } catch (error) {
    console.log('getNav error', error);
    return undefined;
  }
};
