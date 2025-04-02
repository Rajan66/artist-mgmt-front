import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetArtistAlbums } from "@/features/albums/hooks/use-queries";
import { TAlbum } from "@/features/albums/types/album.type";

import AlbumCard from "./details-album-card";

const AlbumList = ({ id }: { id: string }) => {
  const { data: albums } = useGetArtistAlbums(id);
  const albumLists = albums?.data?.filter(
    (album: TAlbum) => album.album_type === "album"
  );

  const singleAndEps = albums?.data?.filter(
    (album: TAlbum) =>
      album.album_type === "single" || album.album_type === "ep"
  );

  return (
    <div className="flex flex-col space-y-2">
      <div className="md:p-2">
        <h2 className="font-bold text-2xl">Discography</h2>
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
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5">
            {albums?.data?.map((album: TAlbum, index: number) => (
              <AlbumCard album={album} key={index} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="album">
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5">
            {albumLists?.map((album: TAlbum, index: number) => (
              <AlbumCard album={album} key={index} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="single">
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5">
            {singleAndEps?.map((album: TAlbum, index: number) => (
              <AlbumCard album={album} key={index} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AlbumList;
