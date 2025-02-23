import { useMutation, useQueryClient } from "@tanstack/react-query";

type ActionPayload = {
  id: string;
  title: string;
  body: string;
};

type Response = {
  id: string;
  userId: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
};

const action = async ({
  id,
  title,
  body,
}: ActionPayload): Promise<Response> => {
  try {
    const response = await fetch("/api/pages", {
      method: "POST",
      body: JSON.stringify({ id, title, body }),
    });

    const json = await response.json();

    return json.data;
  } catch (error: any) {
    console.error("USE ADD PAGE MUTATION ERROR: ", error);

    throw error;
  }
};

const useAddPageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: action,
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });
};

export default useAddPageMutation;
