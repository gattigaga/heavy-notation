import { BlockType } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type ActionPayload = {
  id: string;
  pageId: string;
  index?: number;
  type?: BlockType;
  content?: string;
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

const action = async ({
  id,
  index,
  type,
  content,
}: ActionPayload): Promise<Response> => {
  try {
    const response = await fetch(`/api/blocks/${id}`, {
      method: "PUT",
      body: JSON.stringify({ index, type, content }),
    });

    const json = await response.json();

    return json.data;
  } catch (error: any) {
    console.error("USE UPDATE BLOCK MUTATION ERROR: ", error);

    throw error;
  }
};

const useUpdateBlockMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateBlock"],
    mutationFn: action,
    onSettled: async (data, error, variables) => {
      return await queryClient.invalidateQueries({
        queryKey: ["blocks", { pageId: variables.pageId }],
      });
    },
  });
};

export default useUpdateBlockMutation;
