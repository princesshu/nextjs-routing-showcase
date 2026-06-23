import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPost, posts } from '@/lib/data';

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return { title: post ? post.title : 'Post not found' };
}

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="text-gray-600">{post.body}</p>
    </main>
  );
}
