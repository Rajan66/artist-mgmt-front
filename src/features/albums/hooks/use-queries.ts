import { useQuery } from "@tanstack/react-query";

import {
  getAlbum,
  getAlbums,
  getArtistAlbums,
  getManagerAlbums,
} from "@/features/albums/actions/album.action";

export const useGetAlbums = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["albums"],
    queryFn: getAlbums,
  });

  return { data, isPending, error };
};

export const useGetAlbum = (id: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["album", id],
    queryFn: () => getAlbum(id),
  });
  return { data, isPending, error };
};

export const useGetArtistAlbums = (id: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["artistAlbums"],
    queryFn: () => getArtistAlbums(id),
    enabled: !!id,
  });

  return { data, isPending, error };
};

export const useGetManagerAlbums = (id: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["albums"],
    queryFn: () => getManagerAlbums(id),
  });

  return { data, isPending, error };
};
