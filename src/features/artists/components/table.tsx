"use client";

import React from "react";

import DataTable from "@/components/data-table";
import { columns } from "@/features/artists/components";

import { useGetArtists } from "../hooks/use-queries";
import { TArtist } from "../types/artists.type";

const ArtistTable = () => {
  const { data } = useGetArtists();

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
