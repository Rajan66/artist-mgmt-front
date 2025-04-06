import {
  DeleteRequest,
  GetRequest,
  PostRequest,
  PutRequest,
} from "@/lib/axios/axios";
import { convertPayloadToFormData } from "@/utils/form-data";
import { asyncHandler } from "@/utils/response";

export const getArtists = async () => {
  return asyncHandler(() => GetRequest("/api/v1/artists/"));
};

export const getArtist = async (id: string) => {
  return asyncHandler(() => GetRequest(`/api/v1/artists/${id}/`));
};

export const getArtistWithUser = async (id: string) => {
  return asyncHandler(() => GetRequest(`/api/v1/artists/users/${id}/`));
};

export const getManagerArtists = async (id: string) => {
  return asyncHandler(() => GetRequest(`/api/v1/artists/managers/${id}`));
};

export const createArtist = async (payload: any) => {
  const formData = convertPayloadToFormData(payload);
  console.log(formData);
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
