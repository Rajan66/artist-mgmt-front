"use client";

import React from "react";

import DataTable from "@/components/data-table";
import { columns } from "@/features/albums/components";
import { useGetArtistWithUser } from "@/features/artists/hooks/use-queries";
import { TCookieUser } from "@/types/user.type";

import { useGetArtistAlbums } from "../../hooks/use-queries";
import { TAlbum } from "../../types/album.type";

const AlbumTable = ({ user }: { user: TCookieUser }) => {
  const { data: artist } = useGetArtistWithUser(user.id);
  const { data } = useGetArtistAlbums({ id: artist?.data?.id });

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
