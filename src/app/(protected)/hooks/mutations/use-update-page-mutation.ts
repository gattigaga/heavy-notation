import { useMutation, useQueryClient } from "@tanstack/react-query";

export type ActionPayload = {
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
    const response = await fetch(`/api/pages/${id}`, {
      method: "PUT",
      body: JSON.stringify({ id, title, body }),
    });

    const json = await response.json();

    return json.data;
  } catch (error: any) {
    console.error("USE UPDATE PAGE MUTATION ERROR: ", error);

    throw error;
  }
};

const useUpdatePageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updatePage"],
    mutationFn: action,
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });
};

export default useUpdatePageMutation;
