import BgImage from '@/components/BgImage';
import {getHomeContent} from '@/api/getHomeContent';

export default async function Home() {
  const homeContent = await getHomeContent();
  console.log('got fp data', homeContent);

  if (!homeContent) {
    return null;
  }
  const {
    navigation: {bgImage},
  } = homeContent;

  return (
    <main className="flex flex-col items-center justify-between">
      {bgImage ? <BgImage url={bgImage} alt={'Bg image'} /> : null}
    </main>
  );
}
