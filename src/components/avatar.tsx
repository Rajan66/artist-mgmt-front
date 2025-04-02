"use client";

import Image, { StaticImageData } from "next/image";
import React from "react";

import { LuUser } from "react-icons/lu";

import { api_image } from "@/constants/api";
import { cn } from "@/utils/response";

interface AvatarProps {
  profileImage: StaticImageData;
  imageSize?: string;
  iconSize?: string;
  rounded?: boolean;
  avatar?: boolean;
}

const Avatar = ({
  profileImage,
  iconSize = "4",
  imageSize = "10",
  avatar = true,
  rounded = true,
}: AvatarProps) => {
  return (
    <div>
      {profileImage ? (
        <Image
          src={`${api_image}/${profileImage}`}
          alt="Profile Image"
          width={1280}
          height={720}
          className={cn(
            `size-50`,
            rounded && "rounded-full",
            avatar && "size-10"
          )}
        />
      ) : (
        <div
          className={cn(
            `bg-primary/80 text-background size-50 flex justify-center items-center`,
            rounded && "rounded-full",
            avatar && "size-10"
          )}
        >
          <LuUser className={cn(`size-30`, avatar && "size-10")} />
        </div>
      )}
    </div>
  );
};

export default Avatar;
