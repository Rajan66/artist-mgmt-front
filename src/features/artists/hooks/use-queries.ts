import { useQuery } from "@tanstack/react-query";

import {
  getArtist,
  getArtists,
  getManagerArtists,
} from "@/features/artists/actions/artist.action";

export const useGetArtists = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["artists"],
    queryFn: getArtists,
  });

  return { data, isPending, error };
};

export const useGetArtist = (id: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["artist", id],
    queryFn: () => getArtist(id),
  });
  return { data, isPending, error };
};

export const useGetManagerArtists = (id: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["artists"],
    queryFn: () => getManagerArtists(id),
  });

  return { data, isPending, error };
};
