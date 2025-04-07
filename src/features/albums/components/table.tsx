"use client";

import React from "react";

import DataTable from "@/components/data-table";
import { columns } from "@/features/albums/components";
import { getUser } from "@/utils/get-user";

import { useGetAlbums, useGetManagerAlbums } from "../hooks/use-queries";
import { TAlbum } from "../types/album.type";

const AlbumTable = () => {
  const user = getUser();

  const { data } =
    user?.role === "artist_manager"
      ? useGetManagerAlbums(user?.id)
      : useGetAlbums();

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
