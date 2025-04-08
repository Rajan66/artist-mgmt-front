import { useQuery } from "@tanstack/react-query";

import { getUserProfile, getUserProfiles } from "../actions/user.action";

export const useGetUserProfiles = (page?: number, page_size?: number) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["userProfiles"],
    queryFn: () => getUserProfiles({ page, page_size }),
  });
  return { data, isPending, error };
};

export const useGetUserProfile = (id: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["userProfile", id],
    queryFn: () => getUserProfile(id),
    enabled: !!id,
  });
  return { data, isPending, error };
};
