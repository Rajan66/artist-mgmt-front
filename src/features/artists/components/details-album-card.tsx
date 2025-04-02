import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { api_image } from "@/constants/api";
import { TAlbum } from "@/features/albums/types/album.type";

const AlbumCard = ({ album }: { album: TAlbum }) => {
  return (
    <Link href={`/albums/detail/${album.id}`}>
      <Card className="bg-background border-none w-fit">
        <CardContent>
          <div className="flex flex-col text-sm justify-center gap-1">
            <Image
              src={
                album.cover_image
                  ? `${api_image}/${album.cover_image}`
                  : `/images/weeknd.jpeg`
              }
              alt="Album Cover"
              width={500}
              height={500}
              className="size-60 md:size-42 object-cover rounded-lg mb-1"
            />
            <p className="font-semibold">{album.title}</p>
            <div className="flex items-center space-x-1 opacity-90">
              <p>{new Date(album.release_date).getFullYear().toString()}</p>
              <span className="flex w-1 h-1 bg-primary rounded-full"></span>
              <p>{album.album_type}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default AlbumCard;
