import { PrismaClient, Prisma } from "../app/generated/prisma";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    posts: {
      create: [
        {
          title: "Join the Prisma Discord",
          content: "This is a link to the Prisma Discord server.",
          slug: "join-the-prisma-discord",
          published: true,
        },
        {
          title: "Prisma on YouTube",
          slug: "prisma-on-youtube",
          content: "This is a link to the Prisma YouTube channel.",
        },
      ],
    },
  },
  {
    name: "Bob",
    email: "bob@prisma.io",
    posts: {
      create: [
        {
          title: "Follow Prisma on Twitter",
          slug: "follow-prisma-on-twitter",
          content: "This is a link to the Prisma Twitter account.",
          published: true,
        },
      ],
    },
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();
