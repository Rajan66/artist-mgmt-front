import { useQuery } from "@tanstack/react-query";

import {
  getAlbumSongs,
  getArtistSongs,
  getManagerSongs,
  getSong,
  getSongs,
} from "@/features/songs/actions/song.action";
import { TPaginationProps } from "@/types/page.type";

export const useGetSongs = (page?: number, page_size?: number) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["allSongs", page],
    queryFn: () => getSongs({ page, page_size }),
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

export const useGetArtistSongs = ({
  id,
  page,
  page_size,
}: TPaginationProps) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["artistSongs", id, page],
    queryFn: () => getArtistSongs({ id, page, page_size }),
    enabled: !!id,
  });

  return { data, isPending, error };
};

export const useGetAlbumSongs = ({ id, page, page_size }: TPaginationProps) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["albumSongs", id, page],
    queryFn: () => getAlbumSongs({ id, page, page_size }),
    enabled: !!id,
  });

  return { data, isPending, error };
};

export const useGetManagerSongs = ({
  id,
  page,
  page_size,
}: TPaginationProps) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["songs", id, page],
    queryFn: () => getManagerSongs({ id, page, page_size }),
    enabled: !!id,
  });

  return { data, isPending, error };
};
