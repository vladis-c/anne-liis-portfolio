import {Document} from '@contentful/rich-text-types';

export type Environment = 'master' | 'development' | 'staging';

type EntryText = string;
type EntryList = EntryText[];
type EntryRichText = Document;
// | {
//     content: {
//       content: {
//         marks: any[];
//         nodeType: string;
//         value: string;
//       }[];
//       nodeType: string;
//     }[];
//     nodeType: string;
//   }
type EntryAsset = {sys: {id: string}};
type EntryAssetList = EntryAsset[];

// ENTRIES //
export type ContentfulEntriesApiData = {
  items: Entry[];
  includes: {Asset: Asset[]};
  limit: number;
  skip: number;
  sys: {type: string};
  total: number;
};

type Entry = {
  fields: NavigationFields | HeroFields;
  metadata: {
    concepts: any[];
    tags: any[];
  };
  sys: ItemSys;
};

export type HeroFields = {
  title: {
    [k in string]: EntryText;
  };
  short: {
    [k in string]: EntryRichText;
  };
  heroTitle: {
    [k in string]: EntryRichText;
  };
  heroText: {
    [k in string]: EntryRichText;
  };
  image: {
    [k in string]: EntryAsset;
  };
};

export type NavigationFields = {
  contacts: {
    [k in string]: EntryList;
  };
  menu: {
    [k in string]: EntryList;
  };
  name: {
    [k in string]: EntryRichText;
  };
  tags: {
    [k in string]: EntryList;
  };
  title: {
    [k in string]: EntryText;
  };
  image: {
    [k in string]: EntryAsset;
  };
};

type ItemSys = {
  contentType: ContentType;
  createdAt: Date;
  environment: ContentType;
  firstPublishedAt: Date;
  id: string;
  publishedAt: Date;
  publishedVersion: number;
  revision: number;
  space: ContentType;
  type: string;
  updatedAt: Date;
  urn: string;
};

type ContentType = {
  sys: {
    id: string;
    linkType: string;
    type: string;
  };
};

type Asset = {
  fields: {
    file: {
      [k in string]: {
        contentType: string;
        details: {
          image: {
            height: number;
            width: number;
          };
          size: number;
        };
        fileName: string;
        url: string;
      };
    };
  };
};
