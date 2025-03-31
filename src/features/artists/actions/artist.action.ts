import {
  DeleteRequest,
  GetRequest,
  PostRequest,
  PutRequest,
} from "@/lib/axios/axios";
import { asyncHandler } from "@/utils/response";

export const getArtists = async () => {
  return asyncHandler(() => GetRequest("/api/v1/artists/"));
};

export const getArtist = async (id: string) => {
  return asyncHandler(() => GetRequest(`/api/v1/artists/${id}/`));
};

export const getManagerArtists = async (id: string) => {
  return asyncHandler(() => GetRequest(`/api/v1/artists/managers/${id}`));
};

export const createArtist = async (payload: any) => {
  return asyncHandler(() => PostRequest("/api/v1/users/", { ...payload }));
};

export const updateArtist = async (data: { payload: any; id: string }) => {
  return asyncHandler(() =>
    PutRequest(`/api/v1/artists/${data.id}/`, { ...data.payload })
  );
};

export const deleteArtist = async (id: string) => {
  return asyncHandler(() => DeleteRequest(`/api/v1/artists/${id}/`));
};
