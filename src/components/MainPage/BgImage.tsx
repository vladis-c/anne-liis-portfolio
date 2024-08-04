import React from 'react';
import NextImage from 'next/image';

type ImageProps = {
  url: string;
};

const BgImage = ({url}: ImageProps) => {
  return (
    <div className="absolute top-0 left-0 -z-10 overflow-hidden w-full h-720 md:h-720 xl:h-1080">
      <NextImage
        priority
        src={url}
        alt="background image"
        placeholder="empty"
        id="background image"
        fill={true}
        className="object-cover object-center"
      />
    </div>
  );
};

export default BgImage;
