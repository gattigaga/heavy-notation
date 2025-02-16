import { auth } from "@/helpers/auth";
import { prisma } from "@/helpers/prisma";

export const PUT = async (request: Request) => {
  const session = await auth();
  const body = await request.json();

  const user = await prisma.user.update({
    where: {
      id: session?.user.id,
    },
    data: {
      lang: body.lang,
    },
  });

  return Response.json({ data: user });
};
