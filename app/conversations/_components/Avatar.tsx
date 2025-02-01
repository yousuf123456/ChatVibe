import React from "react";

import Image from "next/image";

import { cn } from "@/lib/utils";
import "../../../public/images/placeholder.jpg";

interface AvatarProps {
  isActive?: boolean;
  image: string | undefined | null;
}

export const Avatar: React.FC<AvatarProps> = ({ image, isActive }) => {
  return (
    <div
      className={cn(
        "flex justify-center relative w-full h-full rounded-full overflow-hidden",
        isActive && "ring-2 ring-offset-2 ring-pink-500"
      )}
    >
      <Image
        fill
        alt="avatar"
        src={image || "/images/placeholder.jpg"}
        className="cursor-pointer object-cover hover:opacity-70 transition"
      />
    </div>
  );
};
