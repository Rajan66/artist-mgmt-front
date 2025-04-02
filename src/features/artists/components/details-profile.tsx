import { StaticImageData } from "next/image";
import React from "react";

import moment from "moment";

import Avatar from "@/components/avatar";

import { TArtist } from "../types/artist.type";

interface DetailsProfileProps {
  profileImage: StaticImageData;
  artist: TArtist;
}

const DetailsProfile = ({ profileImage, artist }: DetailsProfileProps) => {
  const dob = moment(artist.dob).format("ll");
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="mb-4 md:mb-0">
        <Avatar
          profileImage={profileImage}
          imageSize="50"
          iconSize="30"
          avatar={false}
        />
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
