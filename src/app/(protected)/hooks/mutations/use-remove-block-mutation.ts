import { BlockType } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ActionPayload = {
  id: string;
  pageId: string;
};

type Response = {
  id: string;
  pageId: string;
  index: number;
  type: BlockType;
  content: string;
  createdAt: string;
  updatedAt: string;
};

const action = async ({ id }: ActionPayload): Promise<Response> => {
  try {
    const response = await fetch(`/api/blocks/${id}`, {
      method: "DELETE",
    });

    const json = await response.json();

    return json.data;
  } catch (error: any) {
    console.error("USE REMOVE BLOCK MUTATION ERROR: ", error);

    throw error;
  }
};

const useRemoveBlockMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: action,
    onSettled: async (data, error, variables) => {
      return await queryClient.invalidateQueries({
        queryKey: ["blocks", { pageId: variables.pageId }],
      });
    },
  });
};

export default useRemoveBlockMutation;
