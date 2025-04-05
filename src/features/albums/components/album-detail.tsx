"use client";

import { useParams } from "next/navigation";
import React from "react";

import moment from "moment";
import { toast } from "react-toastify";

import Loading from "@/components/loading";
import { useGetAlbumSongs } from "@/features/songs/hooks/use-queries";

import { useGetAlbum } from "../hooks/use-queries";
import AlbumDetailHeader from "./album-detail-header";
import AlbumMore from "./album-more";
import AlbumSongTable from "./album-song-table";

const AlbumDetail = () => {
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
        <AlbumDetailHeader album={album?.data} />
      </div>
      <div className="mt-10">
        <AlbumSongTable
          songs={songs?.data}
          artistId={album?.data?.artist?.id}
        />
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
