"use client";

import React from "react";

import DataTable from "@/components/data-table";
import { columns } from "@/features/albums/components";
import { TCookieUser } from "@/types/user.type";

import { useGetArtistAlbums } from "../../hooks/use-queries";
import { TAlbum } from "../../types/album.type";

const AlbumTable = ({ user }: { user: TCookieUser }) => {
  const { data } = useGetArtistAlbums(user.id);

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
