import NextImage from 'next/image';
import BgImage from '@/components/BgImage';
import {getHomeContent} from '@/api/getHomeContent';
import Contentful, {H5} from '@/components/Contentful/Contentful';
import ArrowRight from '@/svgs/ArrowRight';
import VerticalDivider from '@/svgs/VerticalDivider';
import Instagram from '@/svgs/Instagram';

export default async function Home() {
  const homeContent = await getHomeContent();

  if (!homeContent) {
    return null;
  }
  const {
    navigation: {bgImage, name, menu, contacts},
    hero: {image, heroText, heroTitle, short},
  } = homeContent;

  return (
    <main className="flex flex-col items-center justify-between">
      {/* BG image */}
      {bgImage ? <BgImage url={bgImage} /> : null}
      {/* Navigation content */}
      <nav
        id="navigation"
        className="h-360 sm:h-360 md:h-480 lg:h-720 xl:h-1080 flex flex-row items-start justify-center sm:justify-center md:justify-between lg:justify-between xl:justify-between w-full p-6 sm:p-12 md:p-12 lg:p-12 xl:p-12">
        {/* Menu */}
        <div
          id="navigation menu"
          className="hidden md:flex flex-row justify-start items-center">
          {menu.map((el, i, self) => {
            if (i === self.length - 1) {
              return <H5 key={el}>{el}</H5>;
            } else {
              return (
                <div id={el} key={el} className="flex flex-row">
                  <H5>{el}</H5>
                  <div aria-hidden className="ml-2 mr-2 mt-1">
                    <ArrowRight />
                  </div>
                </div>
              );
            }
          })}
        </div>
        {/* Logo (name) */}
        <Contentful
          document={name}
          className="w-64 md:w-32 lg:w-64 text-center"
        />
        {/* Contacts */}
        <div
          id="navigation contacts"
          className="hidden md:flex flex-row justify-start items-center">
          {contacts.map((el, i, self) => {
            const Contact = ({key}: {key: string}) => {
              if (el.toLowerCase() === 'instagram') {
                return (
                  <div id={key} className="relative -top-1" key={key}>
                    <Instagram />
                  </div>
                );
              } else {
                return <H5 key={el}>{el}</H5>;
              }
            };

            if (i === self.length - 1) {
              return <Contact key={el} />;
            } else {
              return (
                <div className="flex flex-row" key={el}>
                  <Contact key={el} />
                  <div aria-hidden className="ml-2 mr-2 relative -top-1">
                    <VerticalDivider />
                  </div>
                </div>
              );
            }
          })}
        </div>
      </nav>
      {/* Hero content */}
      <section
        id="hero"
        className="flex flex-col lg:flex-row justify-start lg:justify-between items-center w-full h-1080 bg-anne-indigo bg-transparent">
        {/* Left block */}
        <div
          id="author"
          className="relative flex justify-center items-center w-full lg:w-1/2 h-auto md:h-full px-12 lg:px-24 py-12 md:py-24">
          {/* Picture */}
          <div
            id="author picture cover"
            aria-hidden
            className="overflow-hidden w-360 h-480 rounded-full">
            <NextImage
              priority
              src={image}
              alt={'Hero Image'}
              width={360}
              height={480}
              placeholder="empty"
              className="w-full h-full object-cover"
              id="author picture"
              aria-label="author picture"
            />
          </div>
          <div className="absolute w-240 md:w-360 lg:w-480 -bottom-10 lg:bottom-40">
            <Contentful document={short} color="gold" />
          </div>
        </div>
        {/* Divider */}
        <div className="hidden lg:flex w-0.5 h-1080 bg-white" />
        {/* Right block */}
        <div
          id="about"
          className="flex flex-col justify-center items-center lg:items-start w-full lg:w-1/2 h-auto lg:h-full px-12 lg:px-24 py-24 gap-8">
          <Contentful
            document={heroTitle}
            className="text-center lg:text-left"
          />
          <Contentful
            document={heroText}
            className="text-center lg:text-left"
          />
        </div>
      </section>
    </main>
  );
}
