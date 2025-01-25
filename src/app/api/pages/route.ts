import { auth } from "@/helpers/auth";
import { prisma } from "@/helpers/prisma";

export const GET = async () => {
  const session = await auth();

  const pages = await prisma.page.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return Response.json({ data: pages });
};

export const POST = async (request: Request) => {
  const session = await auth();
  const body = await request.json();

  const page = await prisma.page.create({
    data: {
      id: body.id,
      userId: session?.user.id,
      title: body.title,
    },
  });

  await prisma.block.create({
    data: {
      pageId: page.id,
      index: 0,
      type: "TEXT",
      content: "",
    },
  });

  return Response.json({ data: page });
};
