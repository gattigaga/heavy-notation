import { BlockType } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

type ActionPayload = {
  pageSlug: string;
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

const action = async ({ pageSlug }: ActionPayload): Promise<Response> => {
  try {
    const queryString = new URLSearchParams({
      pageSlug,
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
    queryKey: ["blocks", { pageSlug: payload.pageSlug }],
    queryFn: () => action(payload),
  });
};

export default useBlocksQuery;
