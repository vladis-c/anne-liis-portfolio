import {LOCALE} from '@/constants';
import {Environment, ApiPosts, Post, CONTENT_TYPES} from '@/types';

const baseUrl = process.env.CONTENTFUL_BASE_URI;
const spaceId = process.env.CONTENTFUL_SPACE_ID;

export const getEntries = async (env: Environment = 'development') => {
  const res = await fetch(
    `${baseUrl}/spaces/${spaceId}/environments/${env}/public/entries`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_MANAGEMENT_KEY}`,
      },
      // next: { revalidate: 1 },
    },
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

export const getPosts = async () => {
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
        title: item.fields.title[LOCALE],
        description:
          item.fields.description !== undefined
            ? item.fields.description[LOCALE]
            : undefined,
        date: item.fields.date[LOCALE],
        image: asset
          ? {
              url: 'https:' + asset.url,
              width: asset.details.image.width,
              height: asset.details.image.height,
            }
          : null,
      };
    }) as Post[];
  return documents;
};
