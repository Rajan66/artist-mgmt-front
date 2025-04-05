import { useQuery } from "@tanstack/react-query";

import { getUserProfile } from "../actions/user.action";

export const useGetUserProfile = (id: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["userProfile", id],
    queryFn: () => getUserProfile(id),
    enabled: !!id,
  });
  return { data, isPending, error };
};
