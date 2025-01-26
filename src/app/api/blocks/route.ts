import { NextRequest } from "next/server";

import { auth } from "@/helpers/auth";
import { prisma } from "@/helpers/prisma";

export const GET = async (request: NextRequest) => {
  const session = await auth();
  const pageId = request.nextUrl.searchParams.get("pageId") || "";

  const page = await prisma.page.findFirst({
    where: {
      id: pageId,
      userId: session?.user.id,
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
    orderBy: {
      index: "asc",
    },
  });

  return Response.json({ data: blocks });
};

export const POST = async (request: Request) => {
  const session = await auth();
  const body = await request.json();

  const page = await prisma.page.findFirst({
    where: {
      id: body.pageId,
      userId: session?.user.id,
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
    orderBy: {
      index: "asc",
    },
  });

  const block = await prisma.block.create({
    data: {
      pageId: page.id,
      index: body.index,
      type: body.type,
      content: body.content,
    },
  });

  const beforeBlocks = blocks.slice(0, body.index);
  const afterBlocks = blocks.slice(body.index);

  const newBlocks = [...beforeBlocks, block, ...afterBlocks].map(
    (block, index) => ({
      ...block,
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
