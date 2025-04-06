"use client";

import React from "react";

import DataTable from "@/components/data-table";
import { useGetArtistWithUser } from "@/features/artists/hooks/use-queries";
import { columns } from "@/features/songs/components";
import { TCookieUser } from "@/types/user.type";

import { useGetArtistSongs } from "../../hooks/use-queries";
import { TSong } from "../../types/song.type";

const SongTable = ({ user }: { user: TCookieUser }) => {
  const { data: artist } = useGetArtistWithUser(user.id);
  const { data } = useGetArtistSongs(artist?.data?.id);

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
