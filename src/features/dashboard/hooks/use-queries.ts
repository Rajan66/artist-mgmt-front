import { useQuery } from "@tanstack/react-query";

import {
  getAdminArtistAlbumsStats,
  getAdminArtistSongsStats,
  getAdminGenreStats,
  getAdminRecentSongsStats,
  getAdminStats,
  getManagerArtistAlbumsStats,
  getManagerArtistSongsStats,
  getManagerGenreStats,
  getManagerRecentSongsStats,
  getManagerStats,
} from "../actions/stat.action";

export const useGetManagerStats = (id: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["managerStats", id],
    queryFn: () => getManagerStats(id),
  });
  return { data, isPending, error };
};

export const useGetAdminStats = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["adminStats"],
    queryFn: getAdminStats,
  });
  return { data, isPending, error };
};

export const useGetManagerGenreStats = (id: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["managerGenreStats", id],
    queryFn: () => getManagerGenreStats(id),
  });
  return { data, isPending, error };
};

export const useGetAdminGenreStats = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["adminGenreStats"],
    queryFn: getAdminGenreStats,
  });
  return { data, isPending, error };
};

export const useGetManagerArtistSongsStats = (id: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["managerArtistSongs", id],
    queryFn: () => getManagerArtistSongsStats(id),
  });
  return { data, isPending, error };
};

export const useGetAdminArtistSongsStats = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["adminArtistSongsStats"],
    queryFn: getAdminArtistSongsStats,
  });
  return { data, isPending, error };
};

export const useGetManagerArtistAlbumsStats = (id: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["managerArtistAlbums", id],
    queryFn: () => getManagerArtistAlbumsStats(id),
  });
  return { data, isPending, error };
};

export const useGetAdminArtistAlbumsStats = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["adminArtistAlbumsStats"],
    queryFn: getAdminArtistAlbumsStats,
  });
  return { data, isPending, error };
};

export const useGetManagerRecentSongsStats = (id: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["managerRecentSongs", id],
    queryFn: () => getManagerRecentSongsStats(id),
  });
  return { data, isPending, error };
};

export const useGetAdminRecentSongsStats = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["adminRecentSongs"],
    queryFn: getAdminRecentSongsStats,
  });
  return { data, isPending, error };
};
