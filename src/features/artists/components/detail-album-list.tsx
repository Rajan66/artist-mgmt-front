import Link from "next/link";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetArtistAlbums } from "@/features/albums/hooks/use-queries";
import { TAlbum } from "@/features/albums/types/album.type";

import AlbumCard from "./details-album-card";

const AlbumList = ({ id }: { id: string }) => {
  const { data: albums } = useGetArtistAlbums({ id: id });
  const albumLists = albums?.data?.filter(
    (album: TAlbum) => album.album_type === "album"
  );

  const singleAndEps = albums?.data?.filter(
    (album: TAlbum) =>
      album.album_type === "single" || album.album_type === "ep"
  );

  return (
    <>
      {albums?.data?.length > 0 && (
        <div className="flex flex-col space-y-2">
          <div className="md:p-2 flex justify-between items-center">
            <h2 className="font-bold text-2xl">Discography</h2>
            <Link
              href={`/artists/${id}/albums`}
              className="hover:underline text-sm font-semibold"
            >
              <p>Show all</p>
            </Link>
          </div>
          <Tabs defaultValue="all">
            <TabsList className=" bg-background space-x-2">
              {albums?.data && (
                <TabsTrigger value="all" className="rounded-full">
                  All
                </TabsTrigger>
              )}
              {albumLists?.length > 0 && (
                <TabsTrigger value="album" className="rounded-full">
                  Albums
                </TabsTrigger>
              )}

              {singleAndEps?.length > 0 && (
                <TabsTrigger value="single" className="rounded-full">
                  Singles and EPs
                </TabsTrigger>
              )}
            </TabsList>
            <TabsContent value="all">
              <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))]">
                {albums?.data?.map((album: TAlbum, index: number) => (
                  <AlbumCard album={album} key={index} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="album">
              <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))]">
                {albumLists?.map((album: TAlbum, index: number) => (
                  <AlbumCard album={album} key={index} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="single">
              <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))]">
                {singleAndEps?.map((album: TAlbum, index: number) => (
                  <AlbumCard album={album} key={index} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </>
  );
};

export default AlbumList;
