import Link from "next/link";
import { File } from "lucide-react";
import { useLingui } from "@lingui/react/macro";

import { formatToClientTimeAndAgo } from "../../helpers/datetime";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Props = {
  user: {
    name: string;
  };
  title: string;
  updatedAt: string;
  href: string;
};

const PageCard = ({ user, title, updatedAt, href }: Props) => {
  const { t } = useLingui();

  const formattedTitle = (() => {
    if (!title) return t`New Page`;

    return title.length > 26 ? `${title.slice(0, 26)}...` : title;
  })();

  const formattedDate = formatToClientTimeAndAgo(updatedAt);

  return (
    <Link href={href}>
      <div className="flex h-52 flex-col overflow-hidden rounded-xl border border-white bg-zinc-200 hover:border-zinc-300 dark:border-zinc-900 dark:bg-zinc-700 hover:dark:border-zinc-600">
        <div className="h-1/3 bg-zinc-100 dark:bg-zinc-700" />
        <div className="flex flex-1 flex-col bg-zinc-200 p-4 dark:bg-zinc-800">
          <File
            className="-mt-8 mb-2 fill-zinc-200 text-zinc-400 dark:fill-zinc-700 dark:text-zinc-500"
            size={32}
          />
          <p className="mb-auto text-lg font-semibold leading-tight text-zinc-700 dark:text-white">
            {formattedTitle}
          </p>
          <div className="flex items-center gap-x-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="bg-zinc-300 text-sm text-zinc-700 dark:bg-zinc-600 dark:text-white">
                {user?.name[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p className="text-sm text-zinc-400">{formattedDate}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PageCard;
