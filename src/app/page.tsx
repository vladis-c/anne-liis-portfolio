import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import {Document} from '@contentful/rich-text-types';
import Image from 'next/image';

import {getPosts} from '@/api';

export default async function Home() {
  const documents = await getPosts();

  const Descriptions = (): React.ReactNode => {
    return documents && documents.length > 0
      ? documents.map((d: any) => {
          const Text = documentToReactComponents(
            d.description as unknown as Document,
          );
          return (
            <div key={d.id}>
              <Image
                src={d.image.url}
                alt={d.title}
                width={d.image.width}
                height={d.image.height}
                placeholder='empty'
              />
              {Text}
            </div>
          );
        })
      : null;
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Checking if it works. This name is fetched from the server</p>
      {Descriptions()}
      <p>And yes, it does work</p>
    </main>
  );
}
