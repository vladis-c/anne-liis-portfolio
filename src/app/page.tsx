import Link from 'next/link';
import BgImage from '@/components/BgImage';
import {getHomeContent} from '@/api/getHomeContent';
import Contentful from '@/components/Contentful/Contentful';

export default async function Home() {
  const homeContent = await getHomeContent();

  if (!homeContent) {
    return null;
  }
  const {
    navigation: {bgImage, name},
  } = homeContent;

  return (
    <main className="flex flex-col items-center justify-between">
      <div id="1">
        <Contentful document={name} />
        <Link href="/#1">HASH</Link>
        {bgImage ? <BgImage url={bgImage} alt={'Bg image'} /> : null}
      </div>
      <div id="2">
        <Contentful document={name} />
        <Link href="/#2">HASH</Link>
        {bgImage ? <BgImage url={bgImage} alt={'Bg image'} /> : null}
      </div>
    </main>
  );
}
