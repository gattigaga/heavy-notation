import { useMutation, useQueryClient } from "@tanstack/react-query";

type ActionPayload = {
  slug: string;
};

type Response = {
  id: string;
  userId: string;
  slug: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

const action = async ({ slug }: ActionPayload): Promise<Response> => {
  try {
    const response = await fetch(`/api/pages/${slug}`, {
      method: "DELETE",
    });

    const json = await response.json();

    return json.data;
  } catch (error: any) {
    console.error("USE REMOVE PAGE MUTATION ERROR: ", error);

    throw error;
  }
};

const useRemovePageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: action,
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });
};

export default useRemovePageMutation;
