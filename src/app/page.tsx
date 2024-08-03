import Nav from '@/components/MainPage/Nav';
import Hero from '@/components/MainPage/Hero';
import Sections from '@/components/MainPage/Sections';

import {getHomeContent} from '@/api/getHomeContent';
import Footer from '@/components/MainPage/Cta';

export default async function Home() {
  const homeContent = await getHomeContent();

  if (!homeContent) {
    return null;
  }
  const {navigation, hero, sections, cta, footer} = homeContent;

  return (
    <main className="flex flex-col items-center justify-between">
      {/* Navigation content */}
      <Nav {...navigation} />
      {/* Hero content */}
      <Hero {...hero} />
      {/* Sections menu */}
      <Sections sections={sections} />
      <Footer cta={cta} footer={footer} />
    </main>
  );
}
