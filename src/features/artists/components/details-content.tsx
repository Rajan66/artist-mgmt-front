import Image, { StaticImageData } from "next/image";

import { MoreHorizontal } from "lucide-react";
import moment from "moment";
import { LuUser } from "react-icons/lu";

import CustomDropdown from "@/components/dropdown";
import Loading from "@/components/loading";
import { api_image } from "@/constants/api";
import { useGetArtistSongs } from "@/features/songs/hooks/use-queries";
import { TSong } from "@/features/songs/types/song.type";

import { TArtist } from "../types/artist.type";

type DetailsContentProps = {
  artist: TArtist;
  profileImage: StaticImageData;
};

const DetailsContent = ({ artist, profileImage }: DetailsContentProps) => {
  const dob = moment(artist.dob).format("ll");
  const { data: songs, isPending } = useGetArtistSongs(artist.id);
  if (isPending) return <Loading />;

  return (
    <div className="grid grid-cols-5">
      <div className="col-span-1 md:col-span-3">
        <h2 className="px-4 pt-4 py-2 font-bold text-lg">Latest</h2>
        <div className="flex flex-col">
          {songs?.data
            ?.sort(
              (a: TSong, b: TSong) =>
                new Date(b.release_date).getTime() -
                new Date(a.release_date).getTime()
            ) // sort by release_date (newest first)
            .slice(0, 5)
            .map((song: TSong, index: number) => (
              <div
                key={index}
                className="p-4 grid grid-cols-6 items-center space-x-4 hover:bg-primary/10 rounded-md"
              >
                <div className="col-span-4 flex items-center space-x-4">
                  <span>{index + 1}</span>
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
                  <CustomDropdown song={song} />
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="col-span-2 my-4 px-6 flex space-x-6">
        <div>
          {profileImage ? (
            <Image
              src={`${api_image}/${profileImage}`}
              alt="Profile Image"
              width={1280}
              height={720}
              className="size-50"
            />
          ) : (
            <div className="bg-primary/80 text-background size-50 flex justify-center items-center">
              <LuUser className="size-30" />
            </div>
          )}
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
              Total releases:{" "}
            </span>
            <span className="col-span-1">{artist?.no_of_albums_released}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsContent;
