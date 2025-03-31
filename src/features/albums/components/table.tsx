"use client";

import React from "react";

import DataTable from "@/components/data-table";
import { columns } from "@/features/albums/components";

import { useGetAlbums } from "../hooks/use-queries";
import { TAlbum } from "../types/album.type";

const AlbumTable = () => {
  const { data } = useGetAlbums();

  return (
    <DataTable<TAlbum, string[]>
      columns={columns}
      data={(data?.data ?? []) as TAlbum[]}
      searchFilter={{
        column: "title",
        placeholder: "Search by title...",
      }}
    />
  );
};

export default AlbumTable;
