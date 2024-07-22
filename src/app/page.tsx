import Nav from '@/components/MainPage/Nav';
import Hero from '@/components/MainPage/Hero';
import Sections from '@/components/MainPage/Sections';

import {getHomeContent} from '@/api/getHomeContent';
import Scroll from '@/components/Animated/Scroll';

export default async function Home() {
  const homeContent = await getHomeContent();

  if (!homeContent) {
    return null;
  }
  const {navigation, hero, sections} = homeContent;

  return (
    <main className="flex flex-col items-center justify-between">
      <Scroll className="w-full">
        {/* Navigation content */}
        <Nav {...navigation} />
        {/* Hero content */}
        <Hero {...hero} />
        {/* Sections menu */}
        <Sections sections={sections} />
        <section
          id="contacts-footer"
          className="flex w-full h-auto lg:h-1080 bg-anne-indigo-medium">
          <section
            id="contacts-footer"
            className="flex flex-col lg:flex-row justify-start lg:justify-between items-center w-full h-auto lg:h-1/2 bg-anne-indigo-light p-24">
            <></>
          </section>
          <section
            id="contacts-footer"
            className="flex flex-col lg:flex-row justify-start lg:justify-between items-center w-full h-auto lg:h-1/2 p-24">
            <></>
          </section>
        </section>
      </Scroll>
    </main>
  );
}
