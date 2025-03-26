import { DeleteRequest, GetRequest, PostRequest } from "@/lib/axios/axios";
import { asyncHandler } from "@/utils/response";

import { TArtistSchema } from "../schemas/artist.schema";

export const getArtists = async () => {
  return asyncHandler(() => GetRequest("/api/v1/artists/"));
};

export const getArtist = async (id: string) => {
  return asyncHandler(() => GetRequest(`/api/v1/artists/${id}`));
};

export const createArtist = async (payload: TArtistSchema) => {
  return asyncHandler(() => PostRequest("/api/v1/artists/", { ...payload }));
};

export const deleteArtist = async (id: string) => {
  return asyncHandler(() => DeleteRequest(`/api/v1/artists/${id}/`));
};
