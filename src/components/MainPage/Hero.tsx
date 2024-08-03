import HeroImage from '@/svgs/HeroImage';
import {MainPageData} from '@/api/getHomeContent';
import Contentful from '../Contentful/Contentful';

type HeroProps = MainPageData['hero'];

const Hero = ({image, heroText, heroTitle, short}: HeroProps) => {
  return (
    <section
      id="hero"
      className="flex flex-col lg:flex-row justify-start lg:justify-between items-center w-full h-1080 bg-anne-indigo bg-transparent">
      {/* Divider */}
      <div className="hidden lg:flex w-0.5 h-1080 bg-white absolute left-1/2 top-[840px] xl:top-[1200px] z-10" />
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
        <Contentful document={heroTitle} className="text-center lg:text-left" />
        <Contentful document={heroText} className="text-center lg:text-left" />
      </div>
    </section>
  );
};

export default Hero;
