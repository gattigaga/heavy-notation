import { auth } from "@/helpers/auth";
import { prisma } from "@/helpers/prisma";

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const session = await auth();
  const body = await request.json();
  const id = (await params).id;

  const block = await prisma.block.findFirst({
    where: {
      id,
    },
  });

  const page = await prisma.page.findFirst({
    where: {
      id: block?.pageId,
      userId: session?.user.id,
    },
  });

  if (!page || !block) {
    return Response.json(
      { message: "Block is not found." },
      {
        status: 404,
      },
    );
  }

  const newBlock = await prisma.block.update({
    where: {
      id,
    },
    data: {
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

  const newBlocks = blocks.map((block, index) => ({
    ...block,
    index,
  }));

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

  return Response.json({ data: newBlock });
};

export const DELETE = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const session = await auth();
  const id = (await params).id;

  const block = await prisma.block.findFirst({
    where: {
      id,
    },
  });

  const page = await prisma.page.findFirst({
    where: {
      id: block?.pageId,
      userId: session?.user.id,
    },
  });

  if (!page || !block) {
    return Response.json(
      { message: "Block is not found." },
      {
        status: 404,
      },
    );
  }

  await prisma.block.delete({
    where: {
      id,
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

  const newBlocks = blocks.map((block, index) => ({
    ...block,
    index,
  }));

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
