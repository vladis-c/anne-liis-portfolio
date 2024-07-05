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
    hero: {image},
  } = homeContent;

  return (
    <main className="flex flex-col items-center justify-between">
      {/* BG image */}
      {bgImage ? <BgImage url={bgImage} alt={'Bg image'} /> : null}
      {/* Navigation content */}
      <div className="h-360 sm:h-360 md:h-480 lg:h-720 xl:h-1080 flex flex-row items-start justify-center sm:justify-center md:justify-between lg:justify-between xl:justify-between w-full p-6 sm:p-12 md:p-12 lg:p-12 xl:p-12">
        {/* Menu */}
        <div className="hidden sm:hidden md:flex lg:flex xl:flex flex-row justify-start items-center">
          {menu.map((el, i, self) => {
            if (i === self.length - 1) {
              return <H5 key={el}>{el}</H5>;
            } else {
              return (
                <div key={el} className="flex flex-row">
                  <H5>{el}</H5>
                  <div className="ml-2 mr-2 mt-1">
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
          className="w-64 sm:w-64 md:w-32 lg:w-64 xl:w-64 text-center"
        />
        {/* Contacts */}
        <div className="hidden sm:hidden md:flex lg:flex xl:flex flex-row justify-start items-center">
          {contacts.map((el, i, self) => {
            const Element = () => {
              if (el.toLowerCase() === 'instagram') {
                return (
                  <div className="relative -top-1" key={el}>
                    <Instagram />
                  </div>
                );
              } else {
                return <H5 key={el}>{el}</H5>;
              }
            };

            if (i === self.length - 1) {
              return <Element key={el} />;
            } else {
              return (
                <div className="flex flex-row" key={el}>
                  <Element />
                  <div className="ml-2 mr-2 relative -top-1">
                    <VerticalDivider />
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      {/* Hero content */}
      <div className="w-full h-1080 bg-indigo-custom bg-transparent">
        {/* Picture */}
        <div className="overflow-hidden w-360 h-480 rounded-full">
          <NextImage
            priority
            src={image}
            alt={'Hero Image'}
            width={360}
            height={480}
            placeholder="empty"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </main>
  );
}
