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
