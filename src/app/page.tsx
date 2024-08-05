import Nav from '@/components/MainPage/Nav';
import Hero from '@/components/MainPage/Hero';
import Sections from '@/components/MainPage/Sections';

import {getMainPageContent} from '@/api/getMainPageContent';
import Footer from '@/components/MainPage/Footer';

export default async function Home() {
  const homeContent = await getMainPageContent();

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
