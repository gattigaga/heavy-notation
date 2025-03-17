import Image from "next/image";
import { useLingui } from "@lingui/react/macro";

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  const { t } = useLingui();

  return (
    <figure className="relative h-full w-64 cursor-pointer overflow-hidden rounded-lg border border-zinc-200 bg-white p-4 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 hover:dark:bg-zinc-800">
      <div className="flex flex-row items-center gap-2">
        <Image
          className="h-8 w-8 rounded-full"
          src={img}
          alt={t`${name} avatar`}
          width={32}
          height={32}
        />
        <div className="flex flex-col">
          <p className="text-sm font-medium text-zinc-700 dark:text-white">
            {name}
          </p>
          <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
            {username}
          </p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-zinc-700 dark:text-white">
        {body}
      </blockquote>
    </figure>
  );
};

export default ReviewCard;
