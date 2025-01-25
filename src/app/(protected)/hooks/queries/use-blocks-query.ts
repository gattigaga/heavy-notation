import { BlockType } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

type ActionPayload = {
  pageId: string;
};

type QueryPayload = ActionPayload;

type Response = {
  id: string;
  pageId: string;
  index: number;
  type: BlockType;
  content: string;
  createdAt: string;
  updatedAt: string;
}[];

const action = async ({ pageId }: ActionPayload): Promise<Response> => {
  try {
    const queryString = new URLSearchParams({
      pageId,
    }).toString();

    const response = await fetch("/api/blocks?" + queryString, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    return json.data;
  } catch (error: any) {
    console.error("USE BLOCKS QUERY ERROR: ", error);

    throw error;
  }
};

const useBlocksQuery = (payload: QueryPayload) => {
  return useQuery<Response, Error>({
    queryKey: ["blocks", { pageId: payload.pageId }],
    queryFn: () => action(payload),
  });
};

export default useBlocksQuery;
