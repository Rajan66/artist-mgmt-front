import { GetRequest } from "@/lib/axios/axios";
import { asyncHandler } from "@/utils/response";

export const getAdminStats = () => {
  return asyncHandler(() => GetRequest(`/api/v1/stats/admin/`));
};

export const getManagerStats = (id: string) => {
  return asyncHandler(() => GetRequest(`/api/v1/stats/managers/${id}/`));
};

export const getAdminGenreStats = () => {
  return asyncHandler(() => GetRequest(`/api/v1/stats/admin/genre/`));
};

export const getManagerGenreStats = (id: string) => {
  return asyncHandler(() => GetRequest(`/api/v1/stats/managers/${id}/genre/`));
};

export const getAdminArtistSongsStats = () => {
  return asyncHandler(() => GetRequest(`/api/v1/stats/admin/songs/`));
};

export const getManagerArtistSongsStats = (id: string) => {
  return asyncHandler(() => GetRequest(`/api/v1/stats/managers/${id}/songs/`));
};

export const getAdminArtistAlbumsStats = () => {
  return asyncHandler(() => GetRequest(`/api/v1/stats/admin/albums/`));
};

export const getManagerArtistAlbumsStats = (id: string) => {
  return asyncHandler(() => GetRequest(`/api/v1/stats/managers/${id}/albums/`));
};

export const getAdminRecentSongsStats = () => {
  return asyncHandler(() => GetRequest(`/api/v1/stats/admin/songs/recent/`));
};

export const getManagerRecentSongsStats = (id: string) => {
  return asyncHandler(() =>
    GetRequest(`/api/v1/stats/managers/${id}/songs/recent/`)
  );
};
