import { useMutation, useQueryClient } from "@tanstack/react-query";

type ActionPayload = {
  slug: string;
  title: string;
};

type Response = {
  id: string;
  userId: string;
  slug: string;
  title: string;
};

const action = async ({ slug, title }: ActionPayload): Promise<Response> => {
  try {
    const response = await fetch("/api/pages", {
      method: "POST",
      body: JSON.stringify({ slug, title }),
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
