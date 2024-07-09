'use client';
import React, {useEffect, useState} from 'react';
import {Section} from '@/api/getHomeContent';
import Contentful from './Contentful/Contentful';
import SectionImage from '@/svgs/SectionImage';
import ArrowLeft from '@/svgs/ArrowLeft';
import ArrowRight from '@/svgs/ArrowRight';

const Sections = ({sections}: {sections: Section[]}) => {
  const [index, setIndex] = useState(0);
  const [sliced, setSliced] = useState<Section[]>([]);

  useEffect(() => {
    setSliced([...sections.slice(index, index + 3)]);
  }, [index]);

  useEffect(() => {
    console.log(sliced.length);
  }, [sliced]);

  return (
    <>
      <button
        onClick={() => {
          console.log("hello")
          setIndex(prev => prev + 3);
        }}>
        <ArrowLeft />
      </button>
      {sliced.map((section, i) => {
        // @ts-ignore
        const id = section.title.content[0].content[0].value;
        const evenIndex = i % 2 !== 0;
        const thirdIndex = i >= 2;
        const hiddenThird = thirdIndex ? 'hidden xl:flex' : 'flex';

        return (
          <div
            key={id + i}
            id={id.toLowerCase()}
            className={`relative ${hiddenThird} justify-center items-center ${
              evenIndex ? '-bottom-8' : '-top-8'
            }`}>
            <div
              id={`${id} title`}
              className={`absolute ${evenIndex ? '-bottom-4' : '-top-14'}`}>
              <Contentful document={section.title} />
            </div>
            <div
              id="section picture cover"
              aria-hidden
              className="overflow-hidden w-300 h-540 rounded-xl">
              <SectionImage imageUrl={section.images[0]} id={id} />
            </div>
          </div>
        );
      })}
      <ArrowRight />
    </>
  );
};

export default Sections;
