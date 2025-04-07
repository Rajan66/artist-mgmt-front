"use client";

import React from "react";

import DataTable from "@/components/data-table";
import { columns } from "@/features/artists/components";
import { getUser } from "@/utils/get-user";

import { useGetArtists, useGetManagerArtists } from "../hooks/use-queries";
import { TArtist } from "../types/artist.type";

const ArtistTable = () => {
  const user = getUser();
  const { data } =
    user?.role === "artist_manager"
      ? useGetManagerArtists(user?.id)
      : useGetArtists();

  return (
    <DataTable<TArtist, string[]>
      columns={columns}
      data={(data?.data ?? []) as TArtist[]}
      searchFilter={{
        column: "name",
        placeholder: "Search by artist name...",
      }}
    />
  );
};

export default ArtistTable;
