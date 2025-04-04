import React from "react";

import { LuCirclePlus } from "react-icons/lu";

import PageTitle from "@/components/page-title";
import { AlbumTable } from "@/features/albums/components";

const page = () => {
  return (
    <div className="flex flex-col space-y-4">
      <PageTitle
        title="Albums"
        url="/albums/add"
        btnTitle="Add Album"
        Icon={<LuCirclePlus />}
      />
      <AlbumTable />
    </div>
  );
};

export default page;
