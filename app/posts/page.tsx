import { createPost } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { cache } from "react";

const getCachedPosts = cache(async () => {
  const user = await prisma.user.findUnique({
    where: { id: "cmaw7n9z10000rqmbfjgvuxri" },
    include: { posts: true },
  });

  return user?.posts;
});

export default async function Posts() {
  const posts = await getCachedPosts();

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">All posts ({posts?.length})</h1>
      <ul className="mt-4">
        {posts?.map((post) => (
          <li key={post.id}>
            <Link className="underline" href={`/posts/${post.slug}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
      <form action={createPost} className="flex flex-col gap-4 mt-8">
        <Input name="title" placeholder="Title" />
        <Textarea name="content" placeholder="Content" />
        <div>
          <Button type="submit">Create Post</Button>
        </div>
      </form>
    </main>
  );
}
