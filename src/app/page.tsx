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
      {/* {bgImage ? <BgImage url={bgImage} alt={'Bg image'} /> : null} */}
      <Contentful document={name} />
    </main>
  );
}
