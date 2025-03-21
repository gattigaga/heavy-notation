import { auth } from "@/helpers/auth";
import { prisma } from "@/helpers/prisma";

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const session = await auth();
  const id = (await params).id;

  const page = await prisma.page.findFirst({
    where: {
      id,
      userId: session?.user.id,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
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

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const session = await auth();
  const body = await request.json();
  const id = (await params).id;

  const page = await prisma.page.findFirst({
    where: {
      id,
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

  const newPage = await prisma.page.update({
    where: {
      id: page.id,
    },
    data: {
      title: body.title,
      body: body.body,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  return Response.json({ data: newPage });
};

export const DELETE = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const session = await auth();
  const id = (await params).id;

  const page = await prisma.page.findFirst({
    where: {
      id,
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

  const deletedPage = await prisma.page.delete({
    where: {
      id: page.id,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  return Response.json({ data: deletedPage });
};
