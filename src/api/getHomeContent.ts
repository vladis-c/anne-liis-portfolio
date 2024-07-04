import {Document} from '@contentful/rich-text-types';
import {getContentful} from '.';
import ENTRIES from './entries';
import {ContentfulEntriesApiData} from './types';

const LANG = 'en-US';

type FrontPageData = {
  navigation: {
    menu: string[];
    name: Document;
    contacts: string[];
    bgImage: string;
  };
};

export const getHomeContent = async () => {
  try {
    const allEntries = await getContentful<ContentfulEntriesApiData>();

    const frontPageData = {
      navigation: {menu: [], name: {} as Document, contacts: [], bgImage: ''},
    } as FrontPageData;

    if (!allEntries) {
      return frontPageData;
    }

    const navigationEntry = allEntries.items.find(
      item => item.sys.contentType.sys.id === ENTRIES.CONTENT_TYPES.NAVIGATION,
    );

    if (navigationEntry) {
      frontPageData.navigation.menu = navigationEntry.fields.menu[LANG];
      frontPageData.navigation.name = navigationEntry.fields.name[
        LANG
      ] as Document;

      // navigationEntry.fields.name[LANG].content[0].content[0].value;
      frontPageData.navigation.contacts = navigationEntry.fields.contacts[LANG];

      const bgImageId = navigationEntry.fields.image[LANG].sys.id;
      const foundImage = allEntries.includes.Asset.find(asset =>
        asset.fields.file[LANG].url.includes(bgImageId),
      );
      if (foundImage) {
        frontPageData.navigation.bgImage =
          'https:' + foundImage.fields.file[LANG].url;
      }
    }
    return frontPageData;
  } catch (error) {
    console.log('getNav error', error);
    return undefined;
  }
};
