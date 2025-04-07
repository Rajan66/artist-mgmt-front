import { useQuery } from "@tanstack/react-query";

import { getAdminStats, getManagerStats } from "../actions/stat.action";

export const useGetManagerStats = (id: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["managerStats", id],
    queryFn: () => getManagerStats(id),
  });
  return { data, isPending, error };
};

export const useGetAdminStats = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["adminStats"],
    queryFn: getAdminStats,
  });
  return { data, isPending, error };
};
