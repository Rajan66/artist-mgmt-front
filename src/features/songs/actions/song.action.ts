import {
  DeleteRequest,
  GetRequest,
  PostRequest,
  PutRequest,
} from "@/lib/axios/axios";
import { convertPayloadToFormData } from "@/utils/form-data";
import { asyncHandler } from "@/utils/response";

export const getSongs = async () => {
  return asyncHandler(() => GetRequest("/api/v1/songs/"));
};

export const getSong = async (id: string) => {
  return asyncHandler(() => GetRequest(`/api/v1/songs/${id}/`));
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
