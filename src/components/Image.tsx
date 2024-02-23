import React from 'react';
import NextImage from 'next/image';

import {IMAGE} from '@/constants';

type ImageProps = {
  url: string;
  alt: string;
};

const Image = ({url, alt}: ImageProps) => {
  return (
    <NextImage
      priority
      src={url}
      alt={alt}
      width={IMAGE.WIDTH}
      height={IMAGE.HEIGHT}
      placeholder="empty"
      style={{objectFit: 'fill'}}
    />
  );
};

export default Image;
