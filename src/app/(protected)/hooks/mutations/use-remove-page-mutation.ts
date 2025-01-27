import { useMutation, useQueryClient } from "@tanstack/react-query";

export type ActionPayload = {
  id: string;
};

type Response = {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

const action = async ({ id }: ActionPayload): Promise<Response> => {
  try {
    const response = await fetch(`/api/pages/${id}`, {
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
    mutationKey: ["removePage"],
    mutationFn: action,
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });
};

export default useRemovePageMutation;
