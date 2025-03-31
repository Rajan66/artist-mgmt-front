import React from "react";

import { LuCirclePlus } from "react-icons/lu";

import PageTitle from "@/components/page-title";
import { SongTable } from "@/features/songs/components";

const page = () => {
  return (
    <div className="flex flex-col space-y-4">
      <PageTitle
        title="Songs"
        url="/songs/add"
        btnTitle="Add Song"
        Icon={LuCirclePlus}
      />
      <SongTable />
    </div>
  );
};

export default page;
