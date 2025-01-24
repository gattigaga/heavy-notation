import { useQuery } from "@tanstack/react-query";

type ActionPayload = {
  slug: string;
};

type QueryPayload = ActionPayload;

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
    queryKey: ["pages", { slug: payload.slug }],
    queryFn: () => action(payload),
  });
};

export default usePageQuery;
