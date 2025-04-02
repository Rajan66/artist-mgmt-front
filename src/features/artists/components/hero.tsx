"use client";

import Image, { StaticImageData } from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import moment from "moment";
import { LuCircleCheck } from "react-icons/lu";

import cover from "@/assets/weeknd.jpeg";
import Loading from "@/components/loading";
import { api_image } from "@/constants/api";

import { AlbumList, DetailsContent } from ".";
import { useGetArtist } from "../hooks/use-queries";

const ArtistHero = () => {
  const { id } = useParams();
  const { data: artist, isPending } = useGetArtist(id?.toString() || "");
  const [coverImage, setCoverImage] = useState<string | StaticImageData>(cover);
  const [date, setDate] = useState<string | Date>("");

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (artist?.data?.cover_image) {
      setCoverImage(`${api_image}/${artist?.data.cover_image}`);
    }
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const formatDate = moment(artist?.data.created_at).format("ll");
    setDate(formatDate);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [artist]);

  const imageOpacity = Math.max(0, 1 - scrollY / 300);

  if (isPending) return <Loading />;

  return (
    <div className="relative w-full">
      <div className="relative h-[40vh] w-full overflow-hidden rounded-t-xl">
        <div
          className="absolute inset-0 w-full h-full transition-opacity duration-200 "
          style={{ opacity: imageOpacity }}
        >
          <Image
            src={coverImage}
            alt="Hero background"
            fill
            priority
            className="object-cover rounded-xl"
          />
          {/* Gradient overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
        </div>

        <div className="relative z-10 flex flex-col items-start justify-end h-full w-full max-w-7xl px-8 pb-10 ">
          <div className="flex gap-2 justify-center items-center">
            <p className="text-white/90 mb-2 tracking-wide">Verified Artist</p>
            <LuCircleCheck className="mb-2 text-blue-500 rounded-3xl" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {artist?.data.name}
          </h1>
          <p className="text-lg text-white/90 max-w-xl mb-8">
            Member since {date.toString()}
          </p>
        </div>
      </div>
      <div className="flex flex-col space-y-8">
        <DetailsContent
          artist={artist?.data}
          profileImage={artist?.data?.profile_image}
        />
        <AlbumList id={artist?.data?.id} />
      </div>
    </div>
  );
};

export default ArtistHero;
