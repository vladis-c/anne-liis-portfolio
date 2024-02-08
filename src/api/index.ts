import {LOCALE} from '@/constants';
import {Environment} from '@/types';

const baseUrl = process.env.CONTENTFUL_BASE_URI;
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const POST = 'post';

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
  const data = await getEntries();
  const documents = data.items
    .filter((e: any) => e.sys.contentType.sys.id === POST)
    .map((x: any) => {
      const imageId = x.fields.image[LOCALE].sys.id;
      const asset = (data.includes.Asset as any[]).find((x: any) => {
        return x.fields.file[LOCALE].url.includes(imageId);
      }).fields.file[LOCALE];
      return {
        id: x.sys.id + x.fields.title[LOCALE],
        title: x.fields.title[LOCALE],
        description: x.fields.description[LOCALE],
        date: x.fields.date[LOCALE],
        image: {
          url: 'https:' + asset.url,
          width: asset.details.image.width,
          height: asset.details.image.height,
        },
      };
    });
  return documents;
};
