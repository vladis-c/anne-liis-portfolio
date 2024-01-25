import {LOCALE} from '@/constants';
import {Environment} from '@/types';

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

export const getSpaceEntries = async (id: string) => {
  const data = await getEntries();
  const documents: {maintext: Document; date: string}[] = data.items
    .filter((e: any) => e.sys.contentType.sys.id === id)
    .map((x: any) => ({
      maintext: x.fields.maintext[LOCALE] as Document,
      date: x.fields.date[LOCALE] as string,
    }));
  const sortedDocuments = documents.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
  const finalDocuments = sortedDocuments.map(({maintext}) => ({maintext}));
  return finalDocuments;
};
