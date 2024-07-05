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
  } = homeContent;

  return (
    <main className="flex flex-col items-center justify-between p-12">
      {/* BG image */}
      {bgImage ? <BgImage url={bgImage} alt={'Bg image'} /> : null}
      {/* Navigation / logo / contacts */}
      <div className="flex flex-row items-start justify-between w-full">
        <div className="flex flex-row justify-start items-center">
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
        <Contentful document={name} className="w-64 text-center" />
        <div className="flex flex-row justify-start items-center">
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
    </main>
  );
}
