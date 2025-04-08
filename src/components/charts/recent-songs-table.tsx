import React from "react";

import {
  useGetAdminRecentSongsStats,
  useGetManagerRecentSongsStats,
} from "@/features/dashboard/hooks/use-queries";
import { TSong } from "@/features/songs/types/song.type";
import { getUser } from "@/utils/get-user";

import DataTable from "../data-table";
import { columns } from "./columns";

const RecentSongsTable = () => {
  const user = getUser();
  const { data } =
    user?.role === "artist_manager"
      ? useGetManagerRecentSongsStats(user?.id)
      : useGetAdminRecentSongsStats();

  return (
    <DataTable<TSong, string[]>
      columns={columns}
      data={(data?.data ?? []) as TSong[]}
      searchFilter={{
        column: "title",
        placeholder: "Search by song title...",
      }}
      isPagination={false}
      isSearch={false}
      onPaginationChange={() => {}}
    />
  );
};

export default RecentSongsTable;
