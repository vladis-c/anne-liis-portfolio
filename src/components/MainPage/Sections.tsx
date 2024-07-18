import Link from 'next/link';
import {headers} from 'next/headers';

import ArrowLeft from '@/svgs/ArrowLeft';
import ArrowRight from '@/svgs/ArrowRight';
import SectionImage from '@/svgs/SectionImage';
import Contentful from '../Contentful/Contentful';
import {FrontPageData} from '@/api/getHomeContent';

type SectionsProps = {sections: FrontPageData['sections']};
const INDEX = 3;

const Sections = ({sections}: SectionsProps) => {
  const headerList = headers();
  const pathname = headerList.get('x-current-path');
  const splittedPathname = pathname?.split('section=')[1];

  const splittedSections = !splittedPathname
    ? sections.slice(0, INDEX)
    : sections.filter(section => {
        // @ts-ignore
        const id = section.title.content[0].content[0].value.toLowerCase();
        if (splittedPathname !== undefined && splittedPathname === id) {
          return section;
        }
      });
  return (
    <section
      id="photo sections"
      className="flex flex-col lg:flex-row justify-start lg:justify-between items-center w-full h-auto lg:h-1080 bg-anne-indigo-dark p-24">
      <Link href="#photo sections">
        <ArrowLeft />
      </Link>
      {splittedSections.map((section, i) => {
        // @ts-ignore
        const id = section.title.content[0].content[0].value.toLowerCase();
        const evenIndex = i % 2 !== 0;
        return (
          <div
            key={`${id}-${i}`}
            id={`${id}-${i}`}
            className={`relative flex justify-center items-center ${
              evenIndex ? 'top-0 lg:-bottom-8' : 'top-0 lg:-top-8'
            } mb-20 lg:mb-0`}>
            <div
              id={`${id} title`}
              className={`hidden lg:flex absolute ${
                evenIndex ? '-bottom-4' : '-top-14'
              }`}>
              <Contentful document={section.title} />
            </div>
            <div id={`${id} title`} className="flex lg:hidden absolute -top-14">
              <Contentful document={section.title} />
            </div>
            <div
              id="section picture cover"
              aria-hidden
              className="overflow-hidden w-200 h-360 xl:w-300 xl:h-540">
              <SectionImage imageUrl={section.images[0]} id={id} />
            </div>
          </div>
        );
      })}
      <Link href="#photo sections">
        <ArrowRight />
      </Link>
    </section>
  );
};

export default Sections;
