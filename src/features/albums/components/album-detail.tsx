import Image from "next/image";
import React from "react";

import { api_image } from "@/constants/api";

import { TAlbum } from "../types/album.type";

interface AlbumDetailProps {
  album: TAlbum;
}

const AlbumDetail = ({ album }: AlbumDetailProps) => {
  return (
    <div>
      <div>
        <Image
          src={
            album?.cover_image
              ? `${api_image}/${album?.cover_image}`
              : `/images/album.png`
          }
          alt="Album Cover"
          width={500}
          height={500}
          className="size-40 object-cover"
        />
      </div>
    </div>
  );
};

export default AlbumDetail;
