"use client";

import { useSession } from "next-auth/react";
import { useMutationState } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { createId } from "@paralleldrive/cuid2";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useLingui, Trans } from "@lingui/react/macro";

import PageCard from "./PageCard";
import usePagesQuery from "../../hooks/queries/use-pages-query";
import { ActionPayload as RemovePageActionPayload } from "../../hooks/mutations/use-remove-page-mutation";
import useAddPageMutation from "../../hooks/mutations/use-add-page-mutation";
import { Skeleton } from "@/components/ui/skeleton";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const PageList = () => {
  const { t } = useLingui();
  const sidebar = useSidebar();
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
          toast.error(t`Failed to add a new page.`);
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
        <div
          className={cn("grid grid-cols-2 gap-4 xl:grid-cols-4", {
            "md:grid-cols-2": sidebar.state === "expanded",
            "md:grid-cols-3": sidebar.state === "collapsed",
            "lg:grid-cols-3": sidebar.state === "expanded",
            "lg:grid-cols-4": sidebar.state === "collapsed",
          })}
        >
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
            <p className="text-base text-zinc-700">
              <Trans>Add new page</Trans>
            </p>
          </button>
        </div>
      )}
      {pagesQuery.isError && (
        <div className="mt-4 px-2">
          <p className="mx-2 text-xs text-red-500">
            <Trans>Cannot fetch pages data.</Trans>
          </p>
        </div>
      )}
      {pagesQuery.isLoading && (
        <div
          className={cn("grid grid-cols-2 gap-4 xl:grid-cols-4", {
            "md:grid-cols-2": sidebar.state === "expanded",
            "md:grid-cols-3": sidebar.state === "collapsed",
            "lg:grid-cols-3": sidebar.state === "expanded",
            "lg:grid-cols-4": sidebar.state === "collapsed",
          })}
        >
          {[...Array(10)].map((_, index) => (
            <Skeleton key={index} className="col-span-1 h-52 rounded-lg" />
          ))}
        </div>
      )}
    </>
  );
};

export default PageList;
