"use client";

import React from "react";

import DataTable from "@/components/data-table";
import { columns } from "@/features/songs/components";

import { useGetSongs } from "../hooks/use-queries";
import { TSong } from "../types/song.type";

const SongTable = () => {
  const { data } = useGetSongs();

  return (
    <DataTable<TSong, string[]>
      columns={columns}
      data={(data?.data ?? []) as TSong[]}
      searchFilter={{
        column: "title",
        placeholder: "Search by title...",
      }}
    />
  );
};

export default SongTable;
