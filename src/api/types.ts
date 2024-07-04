export type Environment = 'master' | 'development' | 'staging';

// ENTRIES //
export type ContentfulEntriesApiData = {
  items: NavigationEntry[]; // | any other entry
  includes: {Asset: Asset[]};
  limit: number;
  skip: number;
  sys: {type: string};
  total: number;
};

export type NavigationEntry = {
  fields: Fields;
  metadata: {
    concepts: any[];
    tags: any[];
  };
  sys: ItemSys;
};

type Fields = {
  contacts: {
    [k in string]: string[];
  };
  imageUrl: {
    [k in string]: string;
  };
  menu: {
    [k in string]: string[];
  };
  name: {
    [k in string]: {
      content: {
        content: {
          marks: any[];
          nodeType: string;
          value: string;
        }[];
        nodeType: string;
      }[];
      nodeType: string;
    };
  };
  tags: {
    [k in string]: string[];
  };
  title: {
    [k in string]: string;
  };
  image: {
    [k in string]: {
      sys: {id: string};
    };
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
