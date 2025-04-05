import { GetRequest } from "@/lib/axios/axios";
import { asyncHandler } from "@/utils/response";

export const getUserProfile = async (id: string) => {
  return asyncHandler(() => GetRequest(`/api/v1/users/${id}/profile`));
};
