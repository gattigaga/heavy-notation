import { auth } from "@/helpers/auth";
import { prisma } from "@/helpers/prisma";

export async function GET() {
  const session = await auth();

  const pages = await prisma.page.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return Response.json({ data: pages });
}
