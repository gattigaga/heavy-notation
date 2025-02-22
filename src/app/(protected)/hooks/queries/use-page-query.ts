import { useQuery } from "@tanstack/react-query";

type ActionPayload = {
  id: string;
};

type QueryPayload = ActionPayload;

type Response = {
  id: string;
  userId: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
};

const action = async ({ id }: ActionPayload): Promise<Response> => {
  try {
    const response = await fetch(`/api/pages/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    return json.data;
  } catch (error: any) {
    console.error("USE PAGE QUERY ERROR: ", error);

    throw error;
  }
};

const usePageQuery = (payload: QueryPayload) => {
  return useQuery<Response, Error>({
    queryKey: ["pages", { id: payload.id }],
    queryFn: () => action(payload),
  });
};

export default usePageQuery;
