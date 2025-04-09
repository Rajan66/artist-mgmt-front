import { PostRequest } from "@/lib/axios/axios";
import { asyncHandler } from "@/utils/response";

export const changePassword = async (payload: any) => {
  console.log(payload);
  return asyncHandler(() =>
    PostRequest(`/api/v1/auth/password/change/`, payload)
  );
};
