import Image from "next/image";
import React from "react";

import CustomDropdown from "@/components/dropdown";
import { api_image } from "@/constants/api";

import { TSong } from "../types/song.type";

interface SongListProps {
  index: number;
  song: TSong;
  artistId: string;
}
const SongList = ({ index, song, artistId }: SongListProps) => {
  return (
    <div
      key={index}
      className="md:px-4 py-4 grid grid-cols-6 items-center space-x-4 hover:bg-primary/10 rounded-md"
    >
      <div className="col-span-4 flex items-center space-x-4">
        <span>{index}</span>
        <Image
          src={`${api_image}/${song?.cover_image}`}
          alt="Profile Image"
          width={80}
          height={50}
          className="rounded-md w-10 h-10"
        />
        <span>{song?.title}</span>
      </div>
      <div className="col-span-1">
        <span>{song?.genre}</span>
      </div>
      <div className="col-span-1 flex justify-end">
        <CustomDropdown song={song} artistId={artistId} />
      </div>
    </div>
  );
};

export default SongList;
