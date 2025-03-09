import { Language } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";

export type ActionPayload = {
  name?: string;
  lang?: Language;
  image?: File | null;
};

type Response = {
  id: string;
  name: string;
  username: string;
  email: string;
  lang: string;
  image: string;
};

const action = async ({
  name,
  lang,
  image,
}: ActionPayload): Promise<Response> => {
  try {
    const formData = new FormData();
    if (name) formData.append("name", name);
    if (lang) formData.append("lang", lang);
    if (image) formData.append("image", image);

    const response = await fetch("/api/me", {
      method: "PUT",
      body: formData,
    });

    const json = await response.json();

    return json.data;
  } catch (error: any) {
    console.error("USE UPDATE USER MUTATION ERROR: ", error);

    throw error;
  }
};

const useUpdateUserMutation = () => {
  return useMutation({
    mutationKey: ["updateUser"],
    mutationFn: action,
  });
};

export default useUpdateUserMutation;
