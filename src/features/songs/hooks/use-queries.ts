import { useQuery } from "@tanstack/react-query";

import { getSong, getSongs } from "@/features/songs/actions/song.action";

export const useGetSongs = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["songs"],
    queryFn: getSongs,
  });

  return { data, isPending, error };
};

export const useGetSong = (id: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["song", id],
    queryFn: () => getSong(id),
  });
  return { data, isPending, error };
};
