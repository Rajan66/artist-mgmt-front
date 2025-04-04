"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import { PlusCircleIcon } from "lucide-react";
import { LuArrowLeft, LuSquarePen } from "react-icons/lu";

import Avatar from "@/components/avatar";
import Dot from "@/components/dot";
import Tooltip from "@/components/tooltip";
import { Button } from "@/components/ui/button";
import { api_image } from "@/constants/api";

import { TAlbum } from "../types/album.type";

const AlbumDetailHeader = ({ album }: { album: TAlbum }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex gap-8">
        <div>
          <Image
            src={
              album?.cover_image
                ? `${api_image}/${album.cover_image}`
                : `/images/album.png`
            }
            alt="Album Cover"
            width={500}
            height={500}
            className="size-72 object-cover"
          />
        </div>
        <div className="flex flex-col gap-2 justify-center">
          <p className="text-sm capitalize">{album?.album_type}</p>
          <p className="text-7xl capitalize font-bold">{album?.title}</p>

          <div className="flex gap-2 items-center opacity-90">
            <Avatar profileImage={album?.artist?.profile_image} />
            <Link
              href={`/artists/detail/${album?.artist?.id}`}
              className="hover:underline"
            >
              <p className="font-semibold opacity-100">{album?.artist?.name}</p>
            </Link>
            <Dot />
            <p>{album?.release_date.toString().split("-")[0]}</p>
            <Dot />
            <p>{album?.total_tracks} songs</p>
            <Dot />
            <Tooltip text="Add songs" position="bottom">
              <PlusCircleIcon
                className="w-6 h-6 cursor-pointer opacity-70 hover:opacity-100 transition-transform duration-300 ease-in-out hover:scale-110"
                onClick={() => router.push("/songs/add")}
              />
            </Tooltip>
            <Dot />
            <Tooltip text="Edit album" position="bottom">
              <LuSquarePen
                className="w-6 h-6 cursor-pointer opacity-70 hover:opacity-100 transition-transform duration-300 ease-in-out hover:scale-110"
                onClick={() => router.push(`/albums/${album?.id}`)}
              />
            </Tooltip>
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        className="flex gap-2 cursor-pointer"
        onClick={() => router.back()}
      >
        <LuArrowLeft />
        {`Go Back`}
      </Button>
    </>
  );
};

export default AlbumDetailHeader;
