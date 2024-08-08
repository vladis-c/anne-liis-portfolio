import Nav from '@/components/MainPage/Nav';
import Hero from '@/components/MainPage/Hero';
import Sections from '@/components/MainPage/Sections';

import {getMainPageContent} from '@/api/getMainPageContent';
import Footer from '@/components/MainPage/Footer';
import {H1} from '@/components/Contentful/Contentful';

export default async function Home() {
  const homeContent = await getMainPageContent();

  if (!homeContent) {
    return null;
  }
  const {navigation, hero, sections, cta, footer} = homeContent;

  return (
    <main className="flex flex-col items-center justify-between w-full">
      <section className="w-full h-screen bg-anne-indigo-light snap-start">
        <H1>Hello 1</H1>
      </section>
      <section className="w-full h-screen bg-anne-indigo-dark snap-start">
        <H1>Hello 2</H1>
      </section>
      <section className="w-full h-screen bg-anne-indigo-medium snap-start">
        <H1>Hello 3</H1>
      </section>
      <section className="w-full h-screen bg-anne-gold snap-start">
        <H1>Hello 4</H1>
      </section>
    </main>
  );
}

{
  /* Navigation content */
}
{
  /* <Nav {...navigation} /> */
}
{
  /* Hero content */
}
{
  /* <Hero {...hero} /> */
}
{
  /* Sections menu */
}
{
  /* <Sections sections={sections} /> */
}
{
  /* <Footer cta={cta} footer={footer} /> */
}
