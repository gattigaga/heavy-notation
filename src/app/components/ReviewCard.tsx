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
  return (
    <figure className="relative h-full w-64 cursor-pointer overflow-hidden rounded-lg border border-gray-950/[.1] bg-gray-950/[.01] p-4 hover:bg-gray-950/[.05]">
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-zinc-700">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-zinc-400">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export default ReviewCard;
