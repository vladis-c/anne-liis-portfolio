import { Document } from "@contentful/rich-text-types";

export type Environment = 'master' | 'development' | 'staging';

export const CONTENT_TYPES = {
  POST: 'post',
} as const;

export type ContentType = ObjectValues<typeof CONTENT_TYPES>;

type ApiTag = {
  sys: {id: string};
};

type ApiItem = {
  metadata: {tags: ApiTag[]};
  sys: {
    contentType: {
      sys: {id: ContentType};
    };
    id: string;
  };
  fields: {
    image: {
      ['en-US']: {
        sys: {id: string};
      };
    };
    title: {['en-US']: string};
    description?: {['en-US']: string};
    date: {['en-US']: string};
  };
};

type ApiIncludesAsset = {
  fields: {
    file: {
      ['en-US']: {
        url: string;
        details: {
          size: number;
          image: {
            width: number;
            height: number;
          };
        };
      };
    };
  };
};

export type ApiPosts = {
  items: ApiItem[];
  includes: {Asset: ApiIncludesAsset[]};
};

export type PostImage = {
  url: string;
  width: number;
  height: number;
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  document: Document
  date: string;
  image: PostImage | null;
  meta: {
    tags: string[];
  };
};
