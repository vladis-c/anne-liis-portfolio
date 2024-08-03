import {Document} from '@contentful/rich-text-types';
import {getContentful} from '.';
import ENTRIES from './entries';
import {
  ContentfulEntriesApiData,
  CTAFields,
  FooterFields,
  HeroFields,
  NavigationFields,
  SectionFields,
} from './types';

const LANG = 'en-US';

export type Section = {
  title: Document;
  images: string[];
};

export type MainPageData = {
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
  sections: Section[];
  cta: {
    title: Document;
    text: Document;
    contactTitle: Document;
    messageTitle: Document;
  };
  footer: {
    text: Document;
    contacts: string[];
  };
};

export const getHomeContent = async () => {
  try {
    const allEntries = await getContentful<ContentfulEntriesApiData>();

    const emptyDoc = {} as Document;
    const mainPageData = {
      navigation: {menu: [], name: {...emptyDoc}, contacts: [], bgImage: ''},
      hero: {
        image: '',
        short: {...emptyDoc},
        heroTitle: {...emptyDoc},
        heroText: {...emptyDoc},
      },
      sections: [],
      cta: {
        title: {...emptyDoc},
        text: {...emptyDoc},
        contactTitle: {...emptyDoc},
        messageTitle: {...emptyDoc},
      },
      footer: {
        text: {...emptyDoc},
        contacts: [],
      },
    } as MainPageData;

    if (!allEntries) {
      return mainPageData;
    }

    // Navigation
    const navigationEntry = allEntries.items.find(
      item => item.sys.contentType.sys.id === ENTRIES.CONTENT_TYPES.NAVIGATION,
    );

    if (navigationEntry) {
      const fields = navigationEntry.fields as NavigationFields;
      mainPageData.navigation.menu = fields.menu[LANG];
      mainPageData.navigation.name = fields.name[LANG];

      // navigationEntry.fields.name[LANG].content[0].content[0].value;
      mainPageData.navigation.contacts = fields.contacts[LANG];

      const bgImageId = fields.image[LANG].sys.id;
      const foundImage = allEntries.includes.Asset.find(asset =>
        asset.fields.file[LANG].url.includes(bgImageId),
      );
      if (foundImage) {
        mainPageData.navigation.bgImage =
          'https:' + foundImage.fields.file[LANG].url;
      }
    }

    // Hero
    const heroEntry = allEntries.items.find(
      item => item.sys.contentType.sys.id === ENTRIES.CONTENT_TYPES.HERO,
    );

    if (heroEntry) {
      const fields = heroEntry.fields as HeroFields;

      mainPageData.hero.short = fields.short[LANG];
      mainPageData.hero.heroTitle = fields.heroTitle[LANG];
      mainPageData.hero.heroText = fields.heroText[LANG];

      const heroImageId = fields.image[LANG].sys.id;
      const foundImage = allEntries.includes.Asset.find(asset =>
        asset.fields.file[LANG].url.includes(heroImageId),
      );
      if (foundImage) {
        mainPageData.hero.image = 'https:' + foundImage.fields.file[LANG].url;
      }
    }

    // Sections
    const sectionEntries = allEntries.items.filter(
      item => item.sys.contentType.sys.id === ENTRIES.CONTENT_TYPES.SECTION,
    );

    if (sectionEntries && sectionEntries.length > 0) {
      const mappedSections = sectionEntries.map(section => {
        const fields = section.fields as SectionFields;
        const sectionImagesId = fields.images[LANG].map(image => image.sys.id);
        const foundImages = sectionImagesId
          .map(el => {
            const foundImage = allEntries.includes.Asset.find(asset =>
              asset.fields.file[LANG].url.includes(el),
            );
            return foundImage;
          })
          .filter(Boolean);

        return {
          title: fields.sectionTitle[LANG],
          images: [
            ...foundImages.map(el => 'https:' + el?.fields.file[LANG].url),
          ],
          index: fields.index[LANG],
        };
      });

      if (mappedSections && mappedSections.length > 0) {
        // sorting by provided index
        const sortedSections = mappedSections.sort((a, b) => a.index - b.index);
        mainPageData.sections = [
          ...sortedSections,
          ...sortedSections.reverse(),
        ];
      }
    }

    // CTA
    const CTAEntry = allEntries.items.find(
      item => item.sys.contentType.sys.id === ENTRIES.CONTENT_TYPES.CTA,
    );

    if (CTAEntry) {
      const fields = CTAEntry.fields as CTAFields;
      mainPageData.cta.title = fields.title[LANG];
      mainPageData.cta.text = fields.text[LANG];
      mainPageData.cta.contactTitle = fields.contactTitle[LANG];
      mainPageData.cta.messageTitle = fields.messageTitle[LANG];
    }

    // Footer

    const footerEntry = allEntries.items.find(
      item => item.sys.contentType.sys.id === ENTRIES.CONTENT_TYPES.FOOTER,
    );

    if (footerEntry) {
      const fields = footerEntry.fields as FooterFields;
      mainPageData.footer.contacts = fields.contacts[LANG];
      mainPageData.footer.text = fields.text[LANG];
    }

    return mainPageData;
  } catch (error) {
    console.log('getNav error', error);
    return undefined;
  }
};
