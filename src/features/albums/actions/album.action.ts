import {
  DeleteRequest,
  GetRequest,
  PostRequest,
  PutRequest,
} from "@/lib/axios/axios";
import { convertPayloadToFormData } from "@/utils/form-data";
import { asyncHandler } from "@/utils/response";

export const getAlbums = async () => {
  return asyncHandler(() => GetRequest("/api/v1/albums/"));
};

export const getAlbum = async (id: string) => {
  return asyncHandler(() => GetRequest(`/api/v1/albums/${id}/`));
};

export const getArtistAlbums = async (id: string) => {
  return asyncHandler(() => GetRequest(`/api/v1/albums/artists/${id}`));
};

export const getManagerAlbums = async (id: string) => {
  return asyncHandler(() => GetRequest(`/api/v1/albums/managers/${id}`));
};

export const createAlbum = async (payload: any) => {
  const formData = convertPayloadToFormData(payload);
  return asyncHandler(() =>
    PostRequest("/api/v1/albums/", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Important for file uploads
      },
    })
  );
};

export const updateAlbum = async (data: { payload: any; id: string }) => {
  const formData = convertPayloadToFormData(data.payload);
  return asyncHandler(() =>
    PutRequest(`/api/v1/albums/${data.id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  );
};

export const deleteAlbum = async (id: string) => {
  return asyncHandler(() => DeleteRequest(`/api/v1/albums/${id}/`));
};
