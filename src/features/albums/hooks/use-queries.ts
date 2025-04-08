import { useQuery } from "@tanstack/react-query";

import {
  getAlbum,
  getAlbums,
  getArtistAlbums,
  getManagerAlbums,
} from "@/features/albums/actions/album.action";
import { TPaginationProps } from "@/types/page.type";

export const useGetAlbums = (page?: number, page_size?: number) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["albums", page],
    queryFn: () => getAlbums({ page, page_size }),
  });

  return { data, isPending, error };
};

export const useGetAlbum = (id: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["album", id],
    queryFn: () => getAlbum(id),
    enabled: !!id,
  });
  return { data, isPending, error };
};

export const useGetArtistAlbums = ({
  id,
  page_size,
  page,
}: TPaginationProps) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["artistAlbums", id, page],
    queryFn: () => getArtistAlbums({ id, page, page_size }),
    enabled: !!id,
  });

  return { data, isPending, error };
};

export const useGetManagerAlbums = ({
  id,
  page,
  page_size,
}: TPaginationProps) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["albums", page],
    queryFn: () => getManagerAlbums({ id, page, page_size }),
    enabled: !!id,
  });

  return { data, isPending, error };
};
