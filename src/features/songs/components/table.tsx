"use client";

import React, { useState } from "react";

import DataTable from "@/components/data-table";
import { columns } from "@/features/songs/components";
import { getUser } from "@/utils/get-user";

import { useGetManagerSongs, useGetSongs } from "../hooks/use-queries";
import { TSong } from "../types/song.type";

const SongTable = () => {
  const user = getUser();
  const [pageIndex, setPageIndex] = useState(1);

  const handlePageChange = (newPageIndex: number) => {
    setPageIndex(newPageIndex);
  };

  const { data } =
    user?.role === "artist_manager"
      ? useGetManagerSongs({ id: user?.id, page: pageIndex })
      : useGetSongs(pageIndex);

  return (
    <DataTable<TSong, string[]>
      columns={columns}
      data={(data?.data ?? []) as TSong[]}
      searchFilter={{
        column: "title",
        placeholder: "Search by title...",
      }}
      pageIndex={pageIndex}
      onPaginationChange={handlePageChange}
    />
  );
};

export default SongTable;
