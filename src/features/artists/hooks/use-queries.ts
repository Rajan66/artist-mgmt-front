import { useQuery } from "@tanstack/react-query";
import { getArtists } from "@/features/artists/actions/artists.action";

export const useGetArtists = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["artists"],
    queryFn: getArtists,
  });

  return { data, isPending, error };
};
