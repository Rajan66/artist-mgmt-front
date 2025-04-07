import Image from "next/image";
import Link from "next/link";
import React from "react";

import Dot from "@/components/dot";
import { Card, CardContent } from "@/components/ui/card";
import { api_image } from "@/constants/api";
import { TAlbum } from "@/features/albums/types/album.type";

const AlbumCard = ({ album }: { album: TAlbum }) => {
  return (
    <Link href={`/albums/detail/${album.id}`} className="w-fit">
      <Card className="bg-background border-none">
        <CardContent className="px-2">
          <div className="flex flex-col text-sm justify-center gap-1">
            <Image
              src={
                album.cover_image
                  ? `${api_image}/${album.cover_image}`
                  : `/images/album.png`
              }
              alt="Album Cover"
              width={500}
              height={500}
              className="size-60 md:size-42 object-cover rounded-lg mb-1"
            />
            <p className="font-semibold">{album.title}</p>
            <div className="flex items-center space-x-1 opacity-90">
              <p>{new Date(album.release_date).getFullYear().toString()}</p>
              <Dot />
              <p>{album.album_type}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default AlbumCard;
