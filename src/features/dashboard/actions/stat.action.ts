import { GetRequest } from "@/lib/axios/axios";
import { asyncHandler } from "@/utils/response";

export const getAdminStats = () => {
  return asyncHandler(() => GetRequest(`/api/v1/stats/admin/`));
};

export const getManagerStats = (id: string) => {
  return asyncHandler(() => GetRequest(`/api/v1/stats/managers/${id}/`));
};
