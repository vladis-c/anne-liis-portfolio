import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import Link from 'next/link';

import Image from '@/components/Image';
import Cube from '@/components/Animated/Cube';
import {getFrontPage} from '@/api/getFrontPage';

export default async function Home() {
  await getFrontPage();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Cube />
    </main>
  );
}
