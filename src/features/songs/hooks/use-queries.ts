import { useQuery } from "@tanstack/react-query";

import {
  getAlbumSongs,
  getArtistSongs,
  getManagerSongs,
  getSong,
  getSongs,
} from "@/features/songs/actions/song.action";

export const useGetSongs = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["allSongs"],
    queryFn: getSongs,
  });

  return { data, isPending, error };
};

export const useGetSong = (id: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["song", id],
    queryFn: () => getSong(id),
    enabled: !!id,
  });
  return { data, isPending, error };
};

export const useGetArtistSongs = (id: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["artistSongs", id],
    queryFn: () => getArtistSongs(id),
    enabled: !!id,
  });

  return { data, isPending, error };
};

export const useGetAlbumSongs = (id: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["albumSongs", id],
    queryFn: () => getAlbumSongs(id),
    enabled: !!id,
  });

  return { data, isPending, error };
};

export const useGetManagerSongs = (id: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["songs", id],
    queryFn: () => getManagerSongs(id),
    enabled: !!id,
  });

  return { data, isPending, error };
};
