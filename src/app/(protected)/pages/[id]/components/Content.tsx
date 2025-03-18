"use client";

import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { Trans } from "@lingui/react/macro";
import { createId } from "@paralleldrive/cuid2";
import { useDebouncedCallback } from "use-debounce";
import YooptaEditor, {
  createYooptaEditor,
  YooptaContentValue,
} from "@yoopta/editor";
import {
  Bold,
  Italic,
  CodeMark,
  Underline,
  Strike,
  Highlight,
} from "@yoopta/marks";
import Blockquote from "@yoopta/blockquote";
import Callout from "@yoopta/callout";
import Code from "@yoopta/code";
import Divider from "@yoopta/divider";
import Link from "@yoopta/link";
import Paragraph from "@yoopta/paragraph";
import { HeadingOne, HeadingTwo, HeadingThree } from "@yoopta/headings";
import { NumberedList, BulletedList, TodoList } from "@yoopta/lists";
import LinkTool, { DefaultLinkToolRender } from "@yoopta/link-tool";
import ActionMenu, { DefaultActionMenuRender } from "@yoopta/action-menu-list";
import Toolbar, { DefaultToolbarRender } from "@yoopta/toolbar";

import { Skeleton } from "@/components/ui/skeleton";
import TitleBlock from "./TitleBlock";
import usePageQuery from "@/app/(protected)/hooks/queries/use-page-query";
import useUpdatePageMutation, {
  ActionPayload as UpdatePageActionPayload,
} from "@/app/(protected)/hooks/mutations/use-update-page-mutation";

const plugins = [
  Paragraph,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  Divider,
  Link,
  NumberedList,
  BulletedList,
  TodoList,
  Blockquote,
  Callout,
  Code,
];

const marks = [Bold, Italic, CodeMark, Underline, Strike, Highlight];

const tools = {
  Toolbar: {
    tool: Toolbar,
    render: DefaultToolbarRender,
  },
  ActionMenu: {
    tool: ActionMenu,
    render: DefaultActionMenuRender,
  },
  LinkTool: {
    tool: LinkTool,
    render: DefaultLinkToolRender,
  },
};

type Params = {
  id: string;
};

const Content = () => {
  const params = useParams<Params>();
  const pageQuery = usePageQuery({ id: params.id });
  const updatePageMutation = useUpdatePageMutation();

  const editor = useMemo(() => createYooptaEditor(), []);

  const updateContent = useDebouncedCallback((value: YooptaContentValue) => {
    const body = JSON.stringify(value);

    if (pageQuery.data?.body === body) {
      return;
    }

    updatePageMutation.mutate({
      id: params.id,
      body,
    });
  }, 1000);

  const title = updatePageMutation.isPending
    ? updatePageMutation.variables.title || ""
    : pageQuery.data?.title || "";

  // Set editor initial value.
  useEffect(() => {
    if (pageQuery.isSuccess) {
      const newValue = pageQuery.data.body
        ? JSON.parse(pageQuery.data.body)
        : [];

      editor.setEditorValue(newValue);
    }
  }, [pageQuery.isSuccess]);

  return (
    <>
      {pageQuery.isSuccess && (
        <div className="mx-auto max-w-sm px-20 md:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl">
          <TitleBlock
            defaultValue={title}
            onPressEnter={(values) => {
              const payload: UpdatePageActionPayload = {
                id: params.id,
              };

              if (pageQuery.data?.title !== values[0]) {
                payload.title = values[0];
              }

              updatePageMutation.mutate(payload);

              const blockId = editor.insertBlock("Paragraph", {
                at: 0,
                blockData: {
                  value: [
                    {
                      id: createId(),
                      type: "paragraph",
                      children: [
                        {
                          text: values[1],
                        },
                      ],
                    },
                  ],
                },
              });

              editor.focusBlock(blockId);
            }}
            onChange={(title) => {
              if (pageQuery.data?.title === title) {
                return;
              }

              updatePageMutation.mutate({
                id: params.id,
                title,
              });
            }}
          />
          <YooptaEditor
            className="!w-full"
            editor={editor}
            plugins={plugins}
            placeholder="Write something..."
            tools={tools}
            marks={marks}
            onChange={updateContent}
          />
        </div>
      )}
      {pageQuery.isError && (
        <div className="flex w-full flex-col items-center justify-center">
          <h1 className="mb-2 text-7xl font-bold text-zinc-700 dark:text-white">
            404
          </h1>
          <p className="text-center text-sm text-zinc-400 dark:text-zinc-500">
            <Trans>The page you are looking for does not exist.</Trans>
          </p>
        </div>
      )}
      {pageQuery.isLoading && (
        <div className="mx-auto max-w-xl px-20 md:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl">
          <Skeleton className="h-24 w-full rounded-lg bg-zinc-400/10 dark:bg-zinc-500/10" />
        </div>
      )}
    </>
  );
};

export default Content;
