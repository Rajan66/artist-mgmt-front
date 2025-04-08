import {
  DeleteRequest,
  GetRequest,
  PostRequest,
  PutRequest,
} from "@/lib/axios/axios";
import { TPaginationProps } from "@/types/page.type";
import { asyncHandler } from "@/utils/response";

export const getUserProfiles = async ({
  page = 1,
  page_size = 10,
}: TPaginationProps) => {
  return asyncHandler(() =>
    GetRequest(`/api/v1/users/profile/?page=${page}&page_size=${page_size}`)
  );
};

export const getUserProfile = async (id: string) => {
  return asyncHandler(() => GetRequest(`/api/v1/users/${id}/profile/`));
};

export const createUserProfile = async (payload: any) => {
  return asyncHandler(() => PostRequest("/api/v1/users/", payload));
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

export const hardDeleteUserProfile = async (id: string) => {
  return asyncHandler(() =>
    DeleteRequest(`/api/v1/users/${id}/profile/delete/hard/`)
  );
};

export const unbanUserProfile = async (id: string) => {
  return asyncHandler(() => PutRequest(`/api/v1/users/${id}/profile/unban/`));
};
