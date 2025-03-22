import { GetRequest } from "@/lib/axios/axios";
import { asyncHandler } from "@/utils/response";

export const getSongs = async () => {
  return asyncHandler(() => GetRequest("/api/v1/songs/"));
};
