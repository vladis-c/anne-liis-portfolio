import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import {Metadata, ResolvedMetadata} from 'next';
import {revalidateTag} from 'next/cache';

import {getPosts} from '@/api';
import {AUTHOR} from '@/constants';
import Image from '@/components/Image';
import {CONTENT_TYPES, Environment} from '@/types';

type PostPageProps = {params: {slug: string}};
const currentEnv = process.env.CURRENT_ENV as Environment;
const production =
  process.env.NODE_ENV === 'production' || currentEnv === 'master';

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const {title, document, meta, image} = (await getPosts(params.slug))[0];
  const handleImages = () => {
    const images: string[] = [];
    if (image !== null) {
      images.push(image.url);
    }
    return [...images];
  };
  return {
    title,
    keywords: meta.tags,
    authors: [{name: AUTHOR}],
    creator: AUTHOR,
    publisher: AUTHOR,
    description: (document.content[0].content[0] as any).value,
    openGraph: {images: handleImages()},
    // TODO: add details if needed
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
}

export default async function PostPage({params}: PostPageProps) {
  const post = (await getPosts(params.slug))[0];
  // uncomment if revalidation is needed. TODO: turn on in production ('master')
  production && revalidateTag(CONTENT_TYPES.POST);
  const PostContent = (): React.ReactNode => {
    if (!post) {
      return null;
    }
    const Text = documentToReactComponents(post.document);
    return (
      <div>
        {post.image ? <Image url={post.image.url} alt={post.title} /> : null}
        {Text}
        {post.meta.tags.map(tag => (
          <p key={tag}>{tag}</p>
        ))}
      </div>
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {PostContent()}
    </main>
  );
}
