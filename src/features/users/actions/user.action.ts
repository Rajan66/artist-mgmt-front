import { DeleteRequest, GetRequest, PutRequest } from "@/lib/axios/axios";
import { asyncHandler } from "@/utils/response";

export const getUserProfiles = async () => {
  return asyncHandler(() => GetRequest(`/api/v1/users/profile/`));
};

export const getUserProfile = async (id: string) => {
  return asyncHandler(() => GetRequest(`/api/v1/users/${id}/profile/`));
};

export const updateUserProfile = async (data: { payload: any; id: string }) => {
  return asyncHandler(() =>
    PutRequest(`/api/v1/users/${data.id}/profile/`, data.payload)
  );
};

export const softDeleteUserProfile = async (id: string) => {
  return asyncHandler(() =>
    DeleteRequest(`/api/v1/users/${id}/profile/delete/soft/`)
  );
};
