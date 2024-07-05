import {Document} from '@contentful/rich-text-types';
import {getContentful} from '.';
import ENTRIES from './entries';
import {ContentfulEntriesApiData, HeroFields, NavigationFields} from './types';

const LANG = 'en-US';

type FrontPageData = {
  navigation: {
    menu: string[];
    name: Document;
    contacts: string[];
    bgImage: string;
  };
  hero: {
    image: string;
    short: Document;
    heroTitle: Document;
    heroText: Document;
  };
};

export const getHomeContent = async () => {
  try {
    const allEntries = await getContentful<ContentfulEntriesApiData>();

    const emptyDoc = {} as Document;
    const frontPageData = {
      navigation: {menu: [], name: emptyDoc, contacts: [], bgImage: ''},
      hero: {
        image: '',
        short: emptyDoc,
        heroTitle: emptyDoc,
        heroText: emptyDoc,
      },
    } as FrontPageData;

    if (!allEntries) {
      return frontPageData;
    }

    // Navigation
    const navigationEntry = allEntries.items.find(
      item => item.sys.contentType.sys.id === ENTRIES.CONTENT_TYPES.NAVIGATION,
    );

    if (navigationEntry) {
      const fields = navigationEntry.fields as NavigationFields;
      frontPageData.navigation.menu = fields.menu[LANG];
      frontPageData.navigation.name = fields.name[LANG];

      // navigationEntry.fields.name[LANG].content[0].content[0].value;
      frontPageData.navigation.contacts = fields.contacts[LANG];

      const bgImageId = fields.image[LANG].sys.id;
      const foundImage = allEntries.includes.Asset.find(asset =>
        asset.fields.file[LANG].url.includes(bgImageId),
      );
      if (foundImage) {
        frontPageData.navigation.bgImage =
          'https:' + foundImage.fields.file[LANG].url;
      }
    }

    // Hero
    const heroEntry = allEntries.items.find(
      item => item.sys.contentType.sys.id === ENTRIES.CONTENT_TYPES.HERO,
    );

    if (heroEntry) {
      const fields = heroEntry.fields as HeroFields;

      frontPageData.hero.short = fields.short[LANG];
      frontPageData.hero.heroTitle = fields.heroTitle[LANG];
      frontPageData.hero.heroText = fields.heroText[LANG];

      const heroImageId = fields.image[LANG].sys.id;
      const foundImage = allEntries.includes.Asset.find(asset =>
        asset.fields.file[LANG].url.includes(heroImageId),
      );
      if (foundImage) {
        frontPageData.hero.image = 'https:' + foundImage.fields.file[LANG].url;
      }
    }

    return frontPageData;
  } catch (error) {
    console.log('getNav error', error);
    return undefined;
  }
};
