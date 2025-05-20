import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { kebabCase } from "lodash";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function createPost(formData: FormData) {
  "use server";

  try {
    const title = formData.get("title")?.toString();
    const slug = kebabCase(title || "").toLowerCase();
    const content = formData.get("content")?.toString();

    if (!title || !slug || !content) {
      throw new Error("Missing required fields");
    }

    await prisma.post.create({
      data: {
        title,
        slug,
        content,
        author: {
          connect: { id: "cmaw8ils10000rqyru5q76hnz" },
        },
      },
    });

    revalidatePath("/posts");
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error("Post with this slug already exists");
      }
    }
  }
}

export async function updatePost(formData: FormData, id: string) {
  "use server";

  const title = formData.get("title")?.toString();
  const slug = kebabCase(title || "").toLowerCase();
  const content = formData.get("content")?.toString();

  if (!title || !slug || !content) {
    throw new Error("Missing required fields");
  }

  await prisma.post.update({
    where: { id },
    data: {
      title,
      slug,
      content,
    },
  });

  revalidatePath(`/posts/${slug}`);
  revalidatePath("/posts");
}

export async function deletePost(id: string) {
  "use server";
  await prisma.post.delete({ where: { id } });
  revalidatePath("/posts");
}
