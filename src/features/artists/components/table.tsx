"use client";

import React, { useState } from "react";

import DataTable from "@/components/data-table";
import { columns } from "@/features/artists/components";
import { getUser } from "@/utils/get-user";

import { useGetArtists, useGetManagerArtists } from "../hooks/use-queries";
import { TArtist } from "../types/artist.type";

const ArtistTable = () => {
  const user = getUser();
  const [pageIndex, setPageIndex] = useState(1);

  const handlePageChange = (newPageIndex: number) => {
    setPageIndex(newPageIndex);
  };

  const { data } =
    user?.role === "artist_manager"
      ? useGetManagerArtists({ id: user?.id, page: pageIndex })
      : useGetArtists(pageIndex);

  return (
    <DataTable<TArtist, string[]>
      columns={columns}
      data={(data?.data ?? []) as TArtist[]}
      searchFilter={{
        column: "name",
        placeholder: "Search by artist name...",
      }}
      pageIndex={pageIndex}
      onPaginationChange={handlePageChange}
    />
  );
};

export default ArtistTable;
