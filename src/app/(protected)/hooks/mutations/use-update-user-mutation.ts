import { Language } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";

export type ActionPayload = {
  lang: Language;
};

type Response = {
  id: string;
  name: string;
  username: string;
  email: string;
  lang: string;
};

const action = async ({ lang }: ActionPayload): Promise<Response> => {
  try {
    const response = await fetch("/api/me", {
      method: "PUT",
      body: JSON.stringify({ lang }),
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
