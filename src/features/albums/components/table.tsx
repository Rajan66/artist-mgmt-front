"use client";

import React, { useState } from "react";

import DataTable from "@/components/data-table";
import { columns } from "@/features/albums/components";
import { getUser } from "@/utils/get-user";

import { useGetAlbums, useGetManagerAlbums } from "../hooks/use-queries";
import { TAlbum } from "../types/album.type";

const AlbumTable = () => {
  const user = getUser();
  const [pageIndex, setPageIndex] = useState(1);

  const { data } =
    user?.role === "artist_manager"
      ? useGetManagerAlbums({
          id: user?.id,
          page: pageIndex,
        })
      : useGetAlbums(pageIndex);

  const handlePageChange = (newPageIndex: number) => {
    setPageIndex(newPageIndex);
  };

  return (
    <DataTable<TAlbum, string[]>
      columns={columns}
      data={(data?.data ?? []) as TAlbum[]}
      searchFilter={{
        column: "title",
        placeholder: "Search by title...",
      }}
      pageIndex={pageIndex}
      onPaginationChange={handlePageChange}
    />
  );
};

export default AlbumTable;
