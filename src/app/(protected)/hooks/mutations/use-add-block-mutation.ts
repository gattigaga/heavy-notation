import { BlockType } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ActionPayload = {
  pageSlug: string;
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
  pageSlug,
  index,
  type,
  content,
}: ActionPayload): Promise<Response> => {
  try {
    const response = await fetch("/api/blocks", {
      method: "POST",
      body: JSON.stringify({
        pageSlug,
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
      return await queryClient.invalidateQueries({
        queryKey: ["blocks", { pageSlug: variables.pageSlug }],
      });
    },
  });
};

export default useAddBlockMutation;
