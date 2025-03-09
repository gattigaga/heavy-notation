import { Language } from "@prisma/client";
import { Readable } from "stream";
import { UploadApiResponse } from "cloudinary";

import { auth } from "@/helpers/auth";
import { prisma } from "@/helpers/prisma";
import cloudinary from "@/helpers/cloudinary";

export const PUT = async (request: Request) => {
  const session = await auth();
  const formData = await request.formData();

  const lang = formData.get("lang") as Language | null;
  const name = formData.get("name") as string | null;
  const image = formData.get("image") as File | null;

  let uploadedImage: UploadApiResponse | null | undefined = null;

  if (image) {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const stream = Readable.from(buffer);

    uploadedImage = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        {
          folder: "heavy-notation/avatars",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );

      stream.pipe(uploadStream);
    });

    if (session?.user.image) {
      const regex = /\/upload\/v\d+\/(.+?)\.[\w]+$/;
      const match = session.user.image.match(regex);

      if (match?.[1]) {
        await cloudinary.v2.uploader.destroy(match[1]);
      }
    }
  }

  const data = (() => {
    const result: Record<string, FormDataEntryValue> = {};

    if (name) {
      result.name = name;
    }

    if (lang) {
      result.lang = lang;
    }

    if (uploadedImage) {
      result.image = uploadedImage.secure_url;
    }

    return result;
  })();

  const user = await prisma.user.update({
    where: {
      id: session?.user.id,
    },
    data,
  });

  return Response.json({ data: user });
};
