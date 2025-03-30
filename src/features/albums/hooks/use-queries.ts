import { useQuery } from "@tanstack/react-query";

import { getAlbum, getAlbums } from "@/features/albums/actions/albums.action";

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
