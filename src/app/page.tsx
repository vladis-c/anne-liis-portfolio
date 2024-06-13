import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import Link from 'next/link';

import {getPosts} from '@/api';
import Image from '@/components/Image';
import Cube from '@/components/Animated/Cube';

export default async function Home() {
  const documents = await getPosts();

  const Contents = (): React.ReactNode => {
    return documents && documents.length > 0
      ? documents.map(d => {
          const Text = documentToReactComponents(d.document);
          return (
            <div key={d.id}>
              <Link href={`/posts/${d.slug}`}>
                {d.image ? <Image url={d.image.url} alt={d.title} /> : null}
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
      <Cube />
      {Contents()}
    </main>
  );
}
