import { NextRequest } from "next/server";

import { auth } from "@/helpers/auth";
import { prisma } from "@/helpers/prisma";

export const GET = async (request: NextRequest) => {
  const session = await auth();
  const pageSlug = request.nextUrl.searchParams.get("pageSlug") || "";

  const page = await prisma.page.findFirst({
    where: {
      userId: session?.user.id,
      slug: pageSlug,
    },
  });

  if (!page) {
    return Response.json(
      { message: "Page is not found." },
      {
        status: 404,
      },
    );
  }

  const blocks = await prisma.block.findMany({
    where: {
      pageId: page.id,
    },
  });

  return Response.json({ data: blocks });
};

export const POST = async (request: Request) => {
  const session = await auth();
  const body = await request.json();

  const page = await prisma.page.findFirst({
    where: {
      userId: session?.user.id,
      slug: body.pageSlug,
    },
  });

  if (!page) {
    return Response.json(
      { message: "Page is not found." },
      {
        status: 404,
      },
    );
  }

  const block = await prisma.block.create({
    data: {
      pageId: page.id,
      index: body.index,
      type: body.type,
      content: body.content,
    },
  });

  const blocks = await prisma.block.findMany({
    where: {
      pageId: page.id,
    },
    orderBy: {
      index: "asc",
    },
  });

  const beforeBlocks = blocks.slice(0, body.index);
  const afterBlocks = blocks.slice(body.index);

  const newBlocks = [...beforeBlocks, block, ...afterBlocks].map(
    (post, index) => ({
      ...post,
      index,
    }),
  );

  for (const block of newBlocks) {
    await prisma.block.update({
      where: {
        id: block.id,
      },
      data: {
        index: block.index,
      },
    });
  }

  return Response.json({ data: block });
};
