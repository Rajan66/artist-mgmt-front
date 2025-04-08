import { useQuery } from "@tanstack/react-query";

import {
  getArtist,
  getArtistWithUser,
  getArtists,
  getManagerArtists,
} from "@/features/artists/actions/artist.action";
import { TPaginationProps } from "@/types/page.type";

export const useGetArtists = (page?: number, page_size?: number) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["artists", page],
    queryFn: () => getArtists({ page, page_size }),
  });

  return { data, isPending, error };
};

export const useGetArtist = (id: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["artist", id],
    queryFn: () => getArtist(id),
    enabled: !!id,
  });
  return { data, isPending, error };
};

export const useGetArtistWithUser = (id: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["userArtist", id],
    queryFn: () => getArtistWithUser(id),
    enabled: !!id,
  });
  return { data, isPending, error };
};

export const useGetManagerArtists = ({
  id,
  page,
  page_size,
}: TPaginationProps) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["artists", page],
    queryFn: () => getManagerArtists({ id, page, page_size }),
    enabled: !!id,
  });

  return { data, isPending, error };
};
