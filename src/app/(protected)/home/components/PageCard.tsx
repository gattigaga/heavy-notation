import Link from "next/link";
import { File } from "lucide-react";

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
  const formattedTitle = (() => {
    if (!title) return "New Page";

    return title.length > 26 ? `${title.slice(0, 26)}...` : title;
  })();

  const formattedDate = formatToClientTimeAndAgo(updatedAt);

  return (
    <Link href={href}>
      <div className="flex h-52 flex-col overflow-hidden rounded-xl border border-white bg-zinc-200 hover:bg-zinc-300">
        <div className="h-1/3 bg-zinc-100" />
        <div className="flex flex-1 flex-col p-4">
          <File className="-mt-8 mb-2 fill-zinc-200 text-zinc-500" size={32} />
          <p className="mb-auto text-lg font-semibold leading-tight text-zinc-700">
            {formattedTitle}
          </p>
          <div className="flex items-center gap-x-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-sm">
                {user.name[0]?.toUpperCase()}
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
