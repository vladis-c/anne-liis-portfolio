import {LOCALE} from '@/constants';
import {Environment, ApiPosts, Post, CONTENT_TYPES} from '@/types';
import {Document} from '@contentful/rich-text-types';

const baseUrl = process.env.CONTENTFUL_BASE_URI;
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const currentEnv = process.env.CURRENT_ENV;

export const getEntries = async () => {
  const env: Environment = currentEnv
    ? (currentEnv as Environment)
    : 'development';
  const res = await fetch(
    `${baseUrl}/spaces/${spaceId}/environments/${env}/public/entries`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_MANAGEMENT_KEY}`,
      },
      // next: {revalidate: 1},
      next: {
        tags: [CONTENT_TYPES.POST],
      },
    },
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

export const getPosts = async (slug?: string) => {
  const data = (await getEntries()) as ApiPosts;
  const documents = data.items
    .filter(item => item.sys.contentType.sys.id === CONTENT_TYPES.POST)
    .map(item => {
      const imageId = item.fields.image[LOCALE].sys.id;
      const asset = data.includes.Asset.find(asset => {
        return asset.fields.file[LOCALE].url.includes(imageId);
      })?.fields.file[LOCALE];

      return {
        id: item.sys.id + item.fields.title[LOCALE],
        slug: item.fields.title[LOCALE].toLowerCase(),
        title: item.fields.title[LOCALE],
        document: item.fields.description?.[LOCALE] as unknown as Document,
        date: item.fields.date[LOCALE],
        image: asset
          ? {
              url: 'https:' + asset.url,
              width: asset.details.image.width,
              height: asset.details.image.height,
            }
          : null,
        meta: {
          tags: item.metadata.tags.map(t => t.sys.id),
        },
      } as Post;
    });
  if (slug) {
    return documents.filter(d => d.slug === slug);
  }
  return documents;
};
