import { useQuery } from "@tanstack/react-query";

type Response = {
  id: string;
  userId: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  user: {
    name: string;
    image: string | null;
  };
}[];

const action = async (): Promise<Response> => {
  try {
    const response = await fetch("/api/pages", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    return json.data;
  } catch (error: any) {
    console.error("USE PAGES QUERY ERROR: ", error);

    throw error;
  }
};

const usePagesQuery = () => {
  return useQuery<Response, Error>({
    queryKey: ["pages"],
    queryFn: action,
  });
};

export default usePagesQuery;
