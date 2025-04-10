import {
  DeleteRequest,
  GetRequest,
  PostRequest,
  PutRequest,
} from "@/lib/axios/axios";
import { TPaginationProps } from "@/types/page.type";
import { convertPayloadToFormData } from "@/utils/form-data";
import { asyncHandler } from "@/utils/response";

export const getArtists = async ({
  page = 1,
  page_size = 10,
}: TPaginationProps) => {
  return asyncHandler(() =>
    GetRequest(`/api/v1/artists/?page=${page}&page_size=${page_size}`)
  );
};

export const getArtist = async (id: string) => {
  return asyncHandler(() => GetRequest(`/api/v1/artists/${id}/`));
};

export const getArtistWithUser = async (id: string) => {
  return asyncHandler(() => GetRequest(`/api/v1/artists/users/${id}/`));
};

export const getManagerArtists = async ({
  id,
  page = 1,
  page_size = 10,
}: TPaginationProps) => {
  return asyncHandler(() =>
    GetRequest(
      `/api/v1/artists/managers/${id}/?page=${page}&page_size=${page_size}`
    )
  );
};

export const createArtist = async (payload: any) => {
  const formData = convertPayloadToFormData(payload);
  return asyncHandler(() =>
    PostRequest("/api/v1/users/", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Important for file uploads
      },
    })
  );
};

export const updateArtist = async (data: { payload: any; id: string }) => {
  const formData = convertPayloadToFormData(data.payload);
  return asyncHandler(() =>
    PutRequest(`/api/v1/artists/${data.id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  );
};

export const deleteArtist = async (id: string) => {
  return asyncHandler(() => DeleteRequest(`/api/v1/artists/${id}/`));
};

export const softDeleteArtist = async (id: string) => {
  return asyncHandler(() =>
    DeleteRequest(`/api/v1/artists/${id}/delete/soft/`)
  );
};

export const hardDeleteArtist = async (id: string) => {
  return asyncHandler(() =>
    DeleteRequest(`/api/v1/artists/${id}/delete/hard/`)
  );
};

export const unbanArtist = async (id: string) => {
  return asyncHandler(() => PutRequest(`/api/v1/artists/${id}/unban/`));
};
