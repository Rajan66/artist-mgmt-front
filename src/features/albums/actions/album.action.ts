import {
  DeleteRequest,
  GetRequest,
  PostRequest,
  PutRequest,
} from "@/lib/axios/axios";
import { asyncHandler } from "@/utils/response";

export const getAlbums = async () => {
  return asyncHandler(() => GetRequest("/api/v1/albums/"));
};

export const getAlbum = async (id: string) => {
  return asyncHandler(() => GetRequest(`/api/v1/albums/${id}/`));
};

export const createAlbum = async (payload: any) => {
  return asyncHandler(() =>
    PostRequest(
      "/api/v1/albums/",
      {
        ...payload,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      }
    )
  );
};

export const updateAlbum = async (data: { payload: any; id: string }) => {
  console.log(data.payload.release_date);
  return asyncHandler(() =>
    PutRequest(
      `/api/v1/albums/${data.id}/`,
      { ...data.payload },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
  );
};

export const deleteAlbum = async (id: string) => {
  return asyncHandler(() => DeleteRequest(`/api/v1/albums/${id}/`));
};
