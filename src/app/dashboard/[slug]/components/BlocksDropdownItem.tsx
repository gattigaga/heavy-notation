"use client";

type Props = {
  icon: React.ElementType;
  title: string;
  description: string;
  onClick?: () => void;
};

const BlocksDropdownItem = ({ icon, title, description, onClick }: Props) => {
  const Icon = icon;

  return (
    <button
      className="flex items-center gap-x-4 rounded p-2 hover:bg-zinc-100"
      type="button"
      onClick={onClick}
    >
      <div className="flex items-center gap-x-4">
        <div className="flex h-16 w-16 items-center justify-center rounded border bg-white">
          <Icon size={40} />
        </div>
        <div>
          <p className="text-left text-lg font-medium">{title}</p>
          <p className="text-left text-sm text-zinc-400">{description}</p>
        </div>
      </div>
    </button>
  );
};

export default BlocksDropdownItem;
