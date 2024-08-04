import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import {Document, BLOCKS} from '@contentful/rich-text-types';
import Link from 'next/link';

type TextColor = 'gold' | 'white';

type TextProps = {
  children: React.ReactNode;
  className?: string;
};

export const H1 = ({children, className = ''}: TextProps) => (
  <h1
    className={`whitespace-break-spaces font-h text-5xl md:text-6xl lg:text-7xl xl:text-8xl ${className}`}>
    {children}
  </h1>
);

export const H2 = ({children, className = ''}: TextProps) => (
  <h2
    className={`whitespace-break-spaces font-h text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl ${className}`}>
    {children}
  </h2>
);

export const H3 = ({children, className = ''}: TextProps) => (
  <h3
    className={`whitespace-break-spaces font-h text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl ${className}`}>
    {children}
  </h3>
);

export const H4 = ({children, className = ''}: TextProps) => (
  <h4
    className={`whitespace-break-spaces font-h text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl ${className}`}>
    {children}
  </h4>
);

export const H5 = ({children, className = ''}: TextProps) => (
  <h5
    className={`whitespace-break-spaces font-h text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl ${className}`}>
    {children}
  </h5>
);

export const H6 = ({children, className = ''}: TextProps) => (
  <h6
    className={`whitespace-break-spaces font-h text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl ${className}`}>
    {children}
  </h6>
);

export const P = ({children, className = ''}: TextProps) => (
  <p
    className={`whitespace-break-spaces font-p text-xs sm:text-sm md:text-sm lg:text-base xl:text-base ${className}`}>
    {children}
  </p>
);

type ClickableLinkProps = {
  children: React.ReactNode;
  id: string;
};

const ClickableLink = ({children, id}: ClickableLinkProps) => {
  return <Link href={`#${id}`}>{children}</Link>;
};

type ContentfulProps = {
  document: Document | null;
  link?: string;
  className?: string;
  color?: TextColor;
};

const Contentful = ({document, link, className, color}: ContentfulProps) => {
  const textColor =
    color === 'gold'
      ? 'text-anne-gold'
      : color === 'white'
      ? 'text-white'
      : 'text-white';

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node: any, children: React.ReactNode) => (
        <P className={`${className} ${textColor}`}>{children}</P>
      ),
      [BLOCKS.HEADING_1]: (_node: any, children: React.ReactNode) => (
        <H1 className={`${className} ${textColor}`}>{children}</H1>
      ),
      [BLOCKS.HEADING_2]: (_node: any, children: React.ReactNode) => (
        <H2 className={`${className} ${textColor}`}>{children}</H2>
      ),
      [BLOCKS.HEADING_3]: (_node: any, children: React.ReactNode) => (
        <H3 className={`${className} ${textColor}`}>{children}</H3>
      ),
      [BLOCKS.HEADING_4]: (_node: any, children: React.ReactNode) => (
        <H4 className={`${className} ${textColor}`}>{children}</H4>
      ),
      [BLOCKS.HEADING_5]: (_node: any, children: React.ReactNode) => (
        <H5 className={`${className} ${textColor}`}>{children}</H5>
      ),
      [BLOCKS.HEADING_6]: (_node: any, children: React.ReactNode) => (
        <H6 className={`${className} ${textColor}`}>{children}</H6>
      ),
    },
  };
  if (!document) {
    return null;
  }
  if (link) {
    return (
      <ClickableLink id={link}>
        <div>{documentToReactComponents(document, options)}</div>
      </ClickableLink>
    );
  }

  return <div>{documentToReactComponents(document, options)}</div>;
};

export default Contentful;
