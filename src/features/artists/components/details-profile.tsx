"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { getCookie } from "cookies-next";
import moment from "moment";
import { toast } from "react-toastify";

import Avatar from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { useProfileStore } from "@/lib/zustand/store";
import { getUser } from "@/utils/get-user";

import { TArtist } from "../types/artist.type";

interface DetailsProfileProps {
  profileImage: string;
  artist: TArtist;
}

const DetailsProfile = ({ profileImage, artist }: DetailsProfileProps) => {
  const user = getUser();
  const router = useRouter();
  const { profileSkipped, setProfileSkipped } = useProfileStore();
  const dob = artist?.dob ? moment(artist.dob).format("ll") : "";

  useEffect(() => {
    const isIncomplete =
      !artist?.first_name ||
      !artist?.last_name ||
      !artist?.dob ||
      !artist?.gender ||
      !artist?.first_release_year ||
      !artist?.no_of_albums_released;

    if (isIncomplete && profileSkipped === false) {
      toast.info(({ closeToast }) => (
        <div className="flex flex-col gap-2">
          <p>Some details are missing. Let’s get that profile complete!</p>
          <div className="flex gap-2">
            <Button
              size="sm"
              className="w-fit bg-background/50 text-foreground"
              onClick={() => {
                setProfileSkipped(true);
                closeToast?.();
              }}
            >
              Skip
            </Button>
            <Button
              size="sm"
              className="w-fit bg-green-600 text-foreground hover:bg-green-700"
              onClick={() => {
                user?.role === "artist"
                  ? router.push("/settings")
                  : router.push(`/artists/${artist?.id}`);
                closeToast?.();
              }}
            >
              Let’s go →
            </Button>
          </div>
        </div>
      ));
    }
  }, [artist, profileSkipped, router, setProfileSkipped]);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="mb-4 md:mb-0">
        <Avatar profileImage={profileImage} avatar={false} />
      </div>
      <div className="flex flex-col space-y-4">
        <div className="grid grid-cols-2">
          <span className="font-semibold opacity-90 col-span-1">Alias: </span>
          <span className="col-span-1">{artist?.name}</span>
        </div>
        {artist?.first_name && (
          <div className="grid grid-cols-2">
            <span className="font-semibold opacity-90 col-span-1">
              Full Name:
            </span>
            <span className="col-span-1">
              {artist?.first_name} {artist?.last_name}
            </span>
          </div>
        )}
        <div className="grid grid-cols-2">
          <span className="font-semibold opacity-90 col-span-1">Gender:</span>
          <span className="col-span-1">{artist?.gender}</span>
        </div>
        <div className="grid grid-cols-2">
          <span className="font-semibold opacity-90 col-span-1">DOB: </span>
          <span>{dob}</span>
        </div>
        <div className="grid grid-cols-2">
          <span className="font-semibold opacity-90 col-span-1">
            Debut release:
          </span>
          <span className="col-span-1">{artist?.first_release_year}</span>
        </div>
        <div className="grid grid-cols-2">
          <span className="font-semibold opacity-90 col-span-1">
            Total releases:
          </span>
          <span className="col-span-1">{artist?.no_of_albums_released}</span>
        </div>
      </div>
    </div>
  );
};

export default DetailsProfile;
