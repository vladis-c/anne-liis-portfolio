import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import {Document} from '@contentful/rich-text-types';
import Image from 'next/image';

import {getPosts} from '@/api';

type PostPageProps = {params: {slug: string}};

export default async function PostPage({params}: PostPageProps) {
  const post = (await getPosts(params.slug))[0];

  const PostContent = (): React.ReactNode => {
    if (!post) {
      return null;
    }
    const Text = documentToReactComponents(
      post.description as unknown as Document,
    );
    return (
      <div key={post.id}>
        {post.image ? (
          <Image
            src={post.image.url}
            alt={post.title}
            width={post.image.width}
            height={post.image.height}
            placeholder="empty"
          />
        ) : null}
        {Text}
      </div>
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {PostContent()}
    </main>
  );
}
