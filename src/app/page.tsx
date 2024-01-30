import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import {Document} from '@contentful/rich-text-types';

import {getPosts} from '@/api';

export default async function Home() {
  const documents = await getPosts();

  const Descriptions =
    documents && documents.length > 0
      ? documents.map((d: any) =>
          documentToReactComponents(d.description as unknown as Document),
        )
      : null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Checking if it works. This name is fetched from the server</p>
      {Descriptions}
      <p>And yes, it does work</p>
    </main>
  );
}
