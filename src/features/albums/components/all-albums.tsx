"use client";

import { useParams, useRouter } from "next/navigation";

import { LuArrowLeft } from "react-icons/lu";

import { Button } from "@/components/ui/button";

import { AllAlbumsDetail } from ".";
import { useGetArtistAlbums } from "../hooks/use-queries";
import { TAlbum } from "../types/album.type";

const AllAlbums = () => {
  const router = useRouter();
  const { id } = useParams();
  const artistId = id?.toString() || "";
  const { data: albums } = useGetArtistAlbums(artistId);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div></div>
        <Button
          variant="outline"
          className="flex gap-2 cursor-pointer"
          onClick={() => router.back()}
        >
          <LuArrowLeft />
          {`Go Back`}
        </Button>
      </div>
      {albums?.data ? (
        <div>
          {albums?.data.map((album: TAlbum, index: number) => (
            <div className="mb-20" key={index}>
              <AllAlbumsDetail album={album} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center">No albums found.</div>
      )}
    </div>
  );
};

export default AllAlbums;
