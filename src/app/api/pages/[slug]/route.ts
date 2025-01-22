import { auth } from "@/helpers/auth";
import { prisma } from "@/helpers/prisma";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) => {
  const session = await auth();
  const slug = (await params).slug;

  const page = await prisma.page.findFirst({
    where: {
      userId: session?.user.id,
      slug: slug,
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

  return Response.json({ data: page });
};

export const DELETE = async (
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) => {
  const session = await auth();
  const slug = (await params).slug;

  const page = await prisma.page.findFirst({
    where: {
      userId: session?.user.id,
      slug: slug,
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

  await prisma.block.deleteMany({
    where: {
      pageId: page.id,
    },
  });

  await prisma.page.delete({
    where: {
      id: page.id,
    },
  });

  return Response.json({ data: page });
};
