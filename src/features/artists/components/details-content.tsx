import { StaticImageData } from "next/image";

import moment from "moment";

import { TArtist } from "../types/artist.type";

type DetailsContentProps = {
  artist: TArtist;
  profileImage: StaticImageData;
};

const DetailsContent = ({ artist, profileImage }: DetailsContentProps) => {
  const dob = moment(artist.dob).format("ll");
  // const songs = useGetArtistSongs();
  return (
    <div className="grid grid-cols-3">
      <div className="col-span-1 md:col-span-2">
        <h2>Recent songs</h2>
        <div className="flex flex-col bg-red-300">
          <ul>
            <li>Timesless</li>
            <li>Timesless</li>
            <li>Timesless</li>
            <li>Timesless</li>
            <li>Timesless</li>
            <li>Timesless</li>
            <li>Timesless</li>
            <li>Timesless</li>
          </ul>
        </div>
      </div>
      <div className="col-span-1">
        <div>Rounded ball</div>
        <div className="flex flex-col">
          <div>{artist?.name}</div>
          <div>{artist?.first_name}</div>
          <div>{artist?.last_name}</div>
          <div>{artist?.gender}</div>
          <div>{dob}</div>
          <div>{artist?.first_release_year}</div>
          <div>{artist?.no_of_albums_released}</div>
        </div>
      </div>
    </div>
  );
};

export default DetailsContent;
