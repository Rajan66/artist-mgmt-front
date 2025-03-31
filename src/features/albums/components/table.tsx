"use client";

import React from "react";

import DataTable from "@/components/data-table";
import { columns } from "@/features/albums/components";
import { getUser } from "@/utils/get-user";

import { useGetManagerAlbums } from "../hooks/use-queries";
import { TAlbum } from "../types/album.type";

const AlbumTable = () => {
  const manager = getUser();
  const { data } = useGetManagerAlbums(manager.id);

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
