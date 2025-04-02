import React from "react";

import { AlbumCard } from "@/features/artists/components";
import { TArtist } from "@/features/artists/types/artist.type";

import { useGetArtistAlbums } from "../hooks/use-queries";
import { TAlbum } from "../types/album.type";

const AlbumMore = ({ artist }: { artist: TArtist }) => {
  const { data: albums } = useGetArtistAlbums(artist?.id || "");

  return (
    <div className="">
      {albums?.data?.length > 0 && (
        <>
          <h2 className="md:p-2 mt-4 font-bold text-2xl">
            More By {artist?.name}
          </h2>
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))]">
            {albums?.data?.map((album: TAlbum) => (
              <AlbumCard album={album} key={album.id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AlbumMore;
