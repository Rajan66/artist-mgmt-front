import { TAlbum } from "@/features/albums/types/album.type";
import { TArtist } from "@/features/artists/types/artist.type";

export type TSong = {
  id: string;
  title: string;
  album: TAlbum;
  artist?: TArtist;
  release_date: Date;
  genre: TGenre;
  cover_image?: string;
};

export type TGenre =
  | "rnb"
  | "country"
  | "classic"
  | "rock"
  | "jazz"
  | "indie"
  | "jpop";
