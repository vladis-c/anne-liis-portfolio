import React, {Suspense} from 'react';
import {H3} from './Contentful/Contentful';

const Loading = ({children}: {children: React.ReactNode}) => {
  return <Suspense fallback={<H3>Loading...</H3>}>{children}</Suspense>;
};

export default Loading;
