import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import {Document, BLOCKS} from '@contentful/rich-text-types';

const H1 = ({children}: {children: React.ReactNode}) => (
  <h1 className="font-h text-8xl">{children}</h1>
);

const H2 = ({children}: {children: React.ReactNode}) => (
  <h2 className="font-h text-5xl">{children}</h2>
);

const H3 = ({children}: {children: React.ReactNode}) => (
  <h3 className="font-h text-4xl">{children}</h3>
);

const H4 = ({children}: {children: React.ReactNode}) => (
  <h4 className="font-h text-3xl">{children}</h4>
);

const H5 = ({children}: {children: React.ReactNode}) => (
  <h5 className="font-h text-2xl">{children}</h5>
);

const H6 = ({children}: {children: React.ReactNode}) => (
  <h6 className="font-h text-xl">{children}</h6>
);

const P = ({children}: {children: React.ReactNode}) => (
  <p className="font-p text-lg">{children}</p>
);

const Contentful = ({document}: {document: Document}) => {
  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node: any, children: React.ReactNode) => (
        <P>{children}</P>
      ),
      [BLOCKS.HEADING_1]: (_node: any, children: React.ReactNode) => (
        <H1>{children}</H1>
      ),
      [BLOCKS.HEADING_2]: (_node: any, children: React.ReactNode) => (
        <H2>{children}</H2>
      ),
      [BLOCKS.HEADING_3]: (_node: any, children: React.ReactNode) => (
        <H3>{children}</H3>
      ),
      [BLOCKS.HEADING_4]: (_node: any, children: React.ReactNode) => (
        <H4>{children}</H4>
      ),
      [BLOCKS.HEADING_5]: (_node: any, children: React.ReactNode) => (
        <H5>{children}</H5>
      ),
      [BLOCKS.HEADING_6]: (_node: any, children: React.ReactNode) => (
        <H6>{children}</H6>
      ),
    },
  };

  return documentToReactComponents(document, options);
};

export default Contentful;
