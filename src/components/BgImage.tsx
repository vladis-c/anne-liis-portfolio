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
      style={{
        width: '100%',
        height: 'auto',
      }}
      placeholder="empty"
    />
  );
};

export default BgImage;
