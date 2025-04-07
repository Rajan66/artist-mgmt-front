import { useQuery } from "@tanstack/react-query";

import { getUserProfile, getUserProfiles } from "../actions/user.action";

export const useGetUserProfiles = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["userProfiles"],
    queryFn: getUserProfiles,
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
