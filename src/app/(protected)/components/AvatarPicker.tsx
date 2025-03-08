import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useRef, useState } from "react";

type Props = {
  value?: File | null;
  placeholder: string;
  onChange?: (value: File) => void;
};

const AvatarPicker: React.FC<Props> = ({ value, placeholder, onChange }) => {
  const [preview, setPreview] = useState("");
  const refInput = useRef<HTMLInputElement>(null);

  const pickFile = () => {
    const file = refInput.current?.files?.[0];

    if (!file) {
      return;
    }

    onChange?.(file);
  };

  useEffect(() => {
    if (value) {
      setPreview(URL.createObjectURL(value));
    }
  }, [value]);

  return (
    <Avatar
      className="h-32 w-32 rounded-full"
      onClick={() => refInput.current?.click()}
    >
      <AvatarFallback className="select-none rounded-full bg-zinc-300 text-6xl text-zinc-700 dark:bg-zinc-600 dark:text-white">
        {placeholder}
      </AvatarFallback>
      <AvatarImage
        className="rounded-full bg-zinc-300 text-zinc-700 dark:bg-zinc-600 dark:text-white"
        src={preview}
        alt="Avatar Picker"
      />
      <input
        ref={refInput}
        className="hidden"
        type="file"
        onChange={pickFile}
      />
    </Avatar>
  );
};

export default AvatarPicker;
