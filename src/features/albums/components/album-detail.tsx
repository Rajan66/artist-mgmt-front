"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";

import { PlusCircleIcon } from "lucide-react";
import moment from "moment";
import { LuArrowLeft } from "react-icons/lu";
import { toast } from "react-toastify";

import Avatar from "@/components/avatar";
import Dot from "@/components/dot";
import Loading from "@/components/loading";
import Tooltip from "@/components/tooltip";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { api_image } from "@/constants/api";
import { useGetAlbumSongs } from "@/features/songs/hooks/use-queries";

import { useGetAlbum } from "../hooks/use-queries";
import AlbumMore from "./album-more";
import AlbumSongTable from "./album-song-table";

const AlbumDetail = () => {
  const router = useRouter();
  const { id } = useParams();
  const albumId = id?.toString() ?? "";

  const { data: album, error } = useGetAlbum(albumId);
  const {
    data: songs,
    isPending,
    error: songError,
  } = useGetAlbumSongs(albumId);

  if (isPending) return <Loading />;

  if (error || songError) {
    console.error("Error: ", error || songError);
    toast.error("Something went wrong.");
  }

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex  gap-8">
          <div>
            <Image
              src={
                album?.data?.cover_image
                  ? `${api_image}/${album?.data?.cover_image}`
                  : `/images/album.png`
              }
              alt="Album Cover"
              width={500}
              height={500}
              className="size-72 object-cover"
            />
          </div>
          <div className="flex flex-col gap-2 justify-center ">
            <p className="text-sm capitalize">{album?.data?.album_type}</p>
            <p className="text-7xl uppercase font-bold">{album?.data?.title}</p>
            <div className="flex gap-2 items-center opacity-90">
              <Avatar
                profileImage={album?.data?.artist.profile_image}
                imageSize="8"
              />
              <Link
                href={`/artists/detail/${album?.data?.artist?.id}`}
                className="hover:underline"
              >
                <p className="font-semibold opacity-100">
                  {album?.data?.artist.name}
                </p>
              </Link>
              <Dot />
              <p>{album?.data?.artist.first_release_year}</p>
              <Dot />
              <p>{album?.data?.total_tracks}</p>
              <Dot />
              <Tooltip text="Add songs" position="bottom">
                <PlusCircleIcon className="w-6 h-6 cursor-pointer" />
              </Tooltip>
            </div>
          </div>
        </div>
        <div>
          <Button
            variant="outline"
            className="flex gap-2 cursor-pointer"
            onClick={() => router.back()}
          >
            <LuArrowLeft />
            {`Go Back`}
          </Button>
        </div>
      </div>
      <Separator className="my-6" />
      <div>
        <AlbumSongTable songs={songs?.data} />
      </div>
      <div className="opacity-90 p-2 mt-2">
        {moment(album?.data.release_date).format("ll")}
      </div>
      <div>
        <AlbumMore artist={album?.data?.artist} />
      </div>
    </div>
  );
};

export default AlbumDetail;
