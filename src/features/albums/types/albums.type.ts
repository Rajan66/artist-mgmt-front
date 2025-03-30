import { TArtist } from "@/features/artists/types/artist.type";

export type TAlbum = {
  id: string;
  title: string;
  artist: TArtist;
  cover_image: string;
  total_tracks: number;
  release_date: Date;
  album_type: "single" | "ep" | "album";
};
