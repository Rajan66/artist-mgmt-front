"use client";

import React from "react";

import DataTable from "@/components/data-table";
import { columns } from "@/features/albums/components";

import { useGetAlbums } from "../hooks/use-queries";
import { TAlbum } from "../types/albums";

const ArtistTable = () => {
  const { data } = useGetAlbums();
  console.log("data: ", data);

  return (
    <DataTable<TAlbum, string[]>
      columns={columns}
      data={(data?.data ?? []) as TAlbum[]}
      searchFilter={{
        column: "name",
        placeholder: "Search by name...",
      }}
    />
  );
};

export default ArtistTable;
