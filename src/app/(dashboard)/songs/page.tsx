import React from "react";

import { LuCirclePlus } from "react-icons/lu";

import PageTitle from "@/components/page-title";
import { SongTable } from "@/features/songs/components";
import { ArtistSongTable } from "@/features/songs/components/artist";
import { getUser } from "@/utils/get-user-server";

export const dynamic = "force-dynamic";

const page = async () => {
  const user = await getUser();
  return (
    <div className="flex flex-col space-y-4">
      <PageTitle
        title="Songs"
        url="/songs/add"
        btnTitle="Add Song"
        Icon={<LuCirclePlus />}
        isCSV={true}
      />
      {user && (
        <>
          {user.role === "artist" ? (
            <ArtistSongTable user={user} />
          ) : (
            <SongTable />
          )}
        </>
      )}
    </div>
  );
};

export default page;
