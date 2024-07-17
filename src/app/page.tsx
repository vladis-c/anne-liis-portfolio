import NextImage from 'next/image';
import Link from 'next/link';
import {headers} from 'next/headers';

import BgImage from '@/components/BgImage';
import {getHomeContent} from '@/api/getHomeContent';
import Contentful, {H5, P} from '@/components/Contentful/Contentful';
import MenuArrow from '@/svgs/MenuArrow';
import VerticalDivider from '@/svgs/VerticalDivider';
import Instagram from '@/svgs/Instagram';
import ArrowLeft from '@/svgs/ArrowLeft';
import ArrowRight from '@/svgs/ArrowRight';
import SectionImage from '@/svgs/SectionImage';
import HeroImage from '@/svgs/HeroImage';
import {AUTHOR} from '@/constants';

const INDEX = 3;

export default async function Home() {
  const homeContent = await getHomeContent();

  if (!homeContent) {
    return null;
  }
  const {
    navigation: {bgImage, name, menu, contacts},
    hero: {image, heroText, heroTitle, short},
    sections,
  } = homeContent;

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
    <main className="flex flex-col items-center justify-between">
      {/* BG image on top */}
      {bgImage ? <BgImage url={bgImage} /> : null}
      {/* Divider on Hero section */}
      <div className="hidden lg:flex w-0.5 h-1080 bg-white absolute top-0 lg:top-[780px] xl:top-[1200px]" />
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
                    <MenuArrow />
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
            const Contact = () => {
              if (el.toLowerCase() === 'instagram') {
                return (
                  <div
                    id={'Contact via ' + el}
                    className="relative -top-1"
                    key={el}>
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
            <HeroImage imageUrl={image} />
          </div>
          <div className="absolute w-240 md:w-360 lg:w-480 -bottom-10 lg:bottom-40">
            <Contentful document={short} color="gold" />
          </div>
        </div>
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
      {/* Sections menu */}
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
              <div
                id={`${id} title`}
                className="flex lg:hidden absolute -top-14">
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
    </main>
  );
}
