import { BlockType } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ActionPayload = {
  pageId: string;
  index: number;
  type: BlockType;
  content: string;
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
  pageId,
  index,
  type,
  content,
}: ActionPayload): Promise<Response> => {
  try {
    const response = await fetch("/api/blocks", {
      method: "POST",
      body: JSON.stringify({
        pageId,
        index,
        type,
        content,
      }),
    });

    const json = await response.json();

    return json.data;
  } catch (error: any) {
    console.error("USE ADD BLOCK MUTATION ERROR: ", error);

    throw error;
  }
};

const useAddBlockMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: action,
    onSettled: async (data, error, variables) => {
      return await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["pages", { id: variables.pageId }],
        }),
        queryClient.invalidateQueries({
          queryKey: ["blocks", { pageId: variables.pageId }],
        }),
      ]);
    },
  });
};

export default useAddBlockMutation;
