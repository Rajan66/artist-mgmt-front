import { SongList } from "@/features/songs/components";
import { useGetArtistSongs } from "@/features/songs/hooks/use-queries";
import { TSong } from "@/features/songs/types/song.type";

import { DetailsProfile } from ".";
import { TArtist } from "../types/artist.type";

type DetailsContentProps = {
  artist: TArtist;
  profileImage: string;
};

const DetailsContent = ({ artist, profileImage }: DetailsContentProps) => {
  const { data: songs } = useGetArtistSongs(artist?.id);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 2xl:grid-cols-5">
      <div className="col-span-1 md:col-span-2 2xl:col-span-3">
        <h2 className="md:px-4 pt-4 py-2 font-bold text-lg">Latest</h2>
        <div className="flex flex-col">
          {songs?.data?.length > 0 ? (
            songs?.data
              .sort(
                (a: TSong, b: TSong) =>
                  new Date(b.release_date).getTime() -
                  new Date(a.release_date).getTime()
              ) // sort by release_date (newest first)
              .slice(0, 5)
              .map((song: TSong, index: number) => (
                <SongList
                  song={song}
                  key={index}
                  index={index + 1}
                  artistId={artist?.id}
                />
              ))
          ) : (
            <div className="flex h-full px-4 pt-10  items-center">
              No songs released yet.
            </div>
          )}
        </div>
      </div>
      <div className="col-span-1 md:col-span-2 my-4 md:px-6 flex space-x-6">
        <DetailsProfile artist={artist} profileImage={profileImage} />
      </div>
    </div>
  );
};

export default DetailsContent;
