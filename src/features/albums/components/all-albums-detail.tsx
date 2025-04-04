import React from "react";

import { useGetAlbumSongs } from "@/features/songs/hooks/use-queries";

import { AlbumSongTable, AllAlbumsDetailHeader } from ".";
import { TAlbum } from "../types/album.type";

const AllAlbumsDetail = ({ album }: { album: TAlbum }) => {
  const { data: songs, isPending } = useGetAlbumSongs(album.id);

  if (isPending) return null;

  return (
    <div>
      <div className="flex justify-between">
        <AllAlbumsDetailHeader album={album} />
      </div>
      <div className="mt-10">
        <AlbumSongTable songs={songs?.data} />
      </div>
    </div>
  );
};

export default AllAlbumsDetail;
