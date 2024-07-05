import React from 'react';
import NextImage from 'next/image';

type ImageProps = {
  url: string;
  alt: string;
};

const BgImage = ({url, alt}: ImageProps) => {
  return (
    <NextImage
      priority
      src={url}
      alt={alt}
      width={1920}
      height={1080}
      sizes="100vw"
      className="w-full h-auto absolute top-0 left-0 -z-10"
      placeholder="empty"
    />
  );
};

export default BgImage;
