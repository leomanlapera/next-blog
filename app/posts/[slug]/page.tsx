import prisma from "@/lib/prisma";

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
  });

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">{post?.title}</h1>
      <p className="mt-4">{post?.content}</p>
    </main>
  );
}
