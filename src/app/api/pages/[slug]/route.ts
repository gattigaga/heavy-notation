import { prisma } from "@/helpers/prisma";

export const DELETE = async (
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) => {
  const slug = (await params).slug;

  const page = await prisma.page.findFirst({
    where: {
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
