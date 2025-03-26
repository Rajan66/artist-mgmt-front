import { useQuery } from "@tanstack/react-query";

import {
  getArtist,
  getArtists,
} from "@/features/artists/actions/artists.action";

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
