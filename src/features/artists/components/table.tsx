"use client";

import React from "react";

import DataTable from "@/components/data-table";
import { columns } from "@/features/artists/utils/columns";

import { useGetArtists } from "../hooks/use-queries";
import { TArtist } from "../types/artists";

const ArtistTable = () => {
  const { data } = useGetArtists();

  return (
    <div>
      <DataTable<TArtist, string[]>
        columns={columns}
        data={(data?.data ?? []) as TArtist[]}
        searchValue="name"
        url="/artists/add"
        title="Artist"
      />
    </div>
  );
};

export default ArtistTable;
