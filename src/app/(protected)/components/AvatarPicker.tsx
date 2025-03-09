import ImageBlobReduce from "image-blob-reduce";
import { useEffect, useRef, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const reduce = ImageBlobReduce();

type Props = {
  preview?: string;
  value?: File | null;
  placeholder: string;
  onChange?: (value: File) => void;
};

const AvatarPicker: React.FC<Props> = ({
  preview,
  value,
  placeholder,
  onChange,
}) => {
  const [imagePreview, setImagePreview] = useState("");
  const refInput = useRef<HTMLInputElement>(null);

  const pickFile = async () => {
    const file = refInput.current?.files?.[0];

    if (!file) {
      return;
    }

    const blob = await reduce.toBlob(file, { max: 128 });

    const result = new File([blob], file.name, {
      type: blob.type,
    });

    onChange?.(result);
  };

  useEffect(() => {
    if (value) {
      setImagePreview(URL.createObjectURL(value));
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
        className="rounded-full bg-zinc-300 object-cover text-zinc-700 dark:bg-zinc-600 dark:text-white"
        src={imagePreview || preview}
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
