import {
  DeleteRequest,
  GetRequest,
  PostRequest,
  PutRequest,
} from "@/lib/axios/axios";
import { TPaginationProps } from "@/types/page.type";
import { convertPayloadToFormData } from "@/utils/form-data";
import { asyncHandler } from "@/utils/response";

export const getSongs = async ({
  page = 1,
  page_size = 10,
}: TPaginationProps) => {
  return asyncHandler(() =>
    GetRequest(`/api/v1/songs/?page=${page}&page_size=${page_size}`)
  );
};

export const getSong = async (id: string) => {
  return asyncHandler(() => GetRequest(`/api/v1/songs/${id}/`));
};

export const getArtistSongs = async ({
  id,
  page = 1,
  page_size = 10,
}: TPaginationProps) => {
  return asyncHandler(() =>
    GetRequest(
      `/api/v1/songs/artists/${id}/?page=${page}&page_size=${page_size}`
    )
  );
};

export const getAlbumSongs = async ({
  id,
  page = 1,
  page_size = 10,
}: TPaginationProps) => {
  return asyncHandler(() =>
    GetRequest(
      `/api/v1/songs/albums/${id}/?page=${page}&page_size=${page_size}`
    )
  );
};

export const getManagerSongs = async ({
  id,
  page = 1,
  page_size = 10,
}: TPaginationProps) => {
  return asyncHandler(() =>
    GetRequest(
      `/api/v1/songs/managers/${id}/?page=${page}&page_size=${page_size}`
    )
  );
};

export const createSong = async (payload: any) => {
  return asyncHandler(() => PostRequest("/api/v1/songs/", payload));
};

export const updateSong = async (data: { payload: any; id: string }) => {
  return asyncHandler(() =>
    PutRequest(`/api/v1/songs/${data.id}/`, data.payload)
  );
};

export const deleteSong = async (id: string) => {
  return asyncHandler(() => DeleteRequest(`/api/v1/songs/${id}/`));
};
