import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import {Document} from '@contentful/rich-text-types';
import Image from 'next/image';
import Link from 'next/link';

import {getPosts} from '@/api';

export default async function Home() {
  const documents = await getPosts();

  const Contents = (): React.ReactNode => {
    return documents && documents.length > 0
      ? documents.map(d => {
          const Text = documentToReactComponents(d.document);
          return (
            <div key={d.id}>
              <Link href={`/posts/${d.slug}`}>
                {d.image ? (
                  <Image
                    src={d.image.url}
                    alt={d.title}
                    width={d.image.width / 2}
                    height={d.image.height / 2}
                    placeholder="empty"
                  />
                ) : null}
                {Text}
              </Link>
            </div>
          );
        })
      : null;
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Checking if it works. This name is fetched from the server</p>
      {Contents()}
    </main>
  );
}
