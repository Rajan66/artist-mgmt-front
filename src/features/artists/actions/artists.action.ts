import { DeleteRequest, GetRequest } from "@/lib/axios/axios";
import { asyncHandler } from "@/utils/response";

export const getArtists = async () => {
  return asyncHandler(() => GetRequest("/api/v1/artists/"));
};

export const deleteArtist = async (id: string) => {
  return asyncHandler(() => DeleteRequest(`/api/v1/artists/${id}`));
};
