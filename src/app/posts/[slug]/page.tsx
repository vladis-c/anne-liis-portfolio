import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import {Metadata, ResolvedMetadata} from 'next';

import {getPosts} from '@/api';
import {AUTHOR} from '@/constants';

type PostPageProps = {params: {slug: string}};

export async function generateMetadata(
  {params}: PostPageProps,
  parent: ResolvedMetadata,
): Promise<Metadata> {
  const {title, document, meta, image} = (await getPosts(params.slug))[0];
  const previousImages = parent.openGraph?.images || [];
  const handleImages = () => {
    const images: string[] = [];
    if (image !== null) {
      images.push(image.url);
    }
    return [...images, ...previousImages];
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
  // revalidateTag(CONTENT_TYPES.POST);
  const PostContent = (): React.ReactNode => {
    if (!post) {
      return null;
    }
    const Text = documentToReactComponents(post.document);
    return (
      <div>
        {post.image ? (
          <Image
            priority
            src={post.image.url}
            alt={post.title}
            width={post.image.width / 2}
            height={post.image.height / 2}
            placeholder="empty"
          />
        ) : null}
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
