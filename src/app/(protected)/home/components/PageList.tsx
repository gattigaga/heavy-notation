"use client";

import { useSession } from "next-auth/react";
import { useMutationState } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { createId } from "@paralleldrive/cuid2";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import PageCard from "./PageCard";
import usePagesQuery from "../../hooks/queries/use-pages-query";
import { ActionPayload as RemovePageActionPayload } from "../../hooks/mutations/use-remove-page-mutation";
import useAddPageMutation from "../../hooks/mutations/use-add-page-mutation";
import { Skeleton } from "@/components/ui/skeleton";

const PageList = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const pagesQuery = usePagesQuery();
  const addPageMutation = useAddPageMutation();

  const removePageMutationVariables = useMutationState({
    filters: {
      mutationKey: ["removePage"],
      status: "pending",
    },
    select: (mutation) => {
      return mutation.state.variables as RemovePageActionPayload;
    },
  });

  const pages = (() => {
    const removedItemIds = removePageMutationVariables.map((variable) => {
      return variable.id;
    });

    const pages =
      pagesQuery.data?.filter((item) => {
        if (removedItemIds.includes(item.id)) {
          return false;
        }

        return true;
      }) || [];

    return pages;
  })();

  const addPage = () => {
    const id = createId();

    addPageMutation.mutate(
      {
        id,
        title: "",
      },
      {
        onError: () => {
          toast.error("Failed to add a new page.");
        },
        onSettled: () => {
          addPageMutation.reset();
        },
      },
    );

    router.push(`/pages/${id}`);
  };

  return (
    <>
      {pagesQuery.isSuccess && (
        <div className="grid grid-cols-5 gap-4">
          {pages.map((page) => (
            <div key={page.id} className="col-span-1">
              <PageCard
                user={session?.user}
                title={page.title}
                updatedAt={page.updatedAt}
                href={`/pages/${page.id}`}
              />
            </div>
          ))}
          <button
            className="col-span-1 flex h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-white bg-zinc-200 hover:bg-zinc-300"
            type="button"
            onClick={addPage}
          >
            <Plus className="mb-4 text-zinc-700" size={48} />
            <p className="text-base text-zinc-700">Add new page</p>
          </button>
        </div>
      )}
      {pagesQuery.isError && (
        <div className="mt-4 px-2">
          <p className="mx-2 text-xs text-red-500">Cannot fetch pages data.</p>
        </div>
      )}
      {pagesQuery.isLoading && (
        <div className="grid grid-cols-5 gap-4">
          {[...Array(10)].map((_, index) => (
            <Skeleton key={index} className="col-span-1 h-52 rounded-lg" />
          ))}
        </div>
      )}
    </>
  );
};

export default PageList;
