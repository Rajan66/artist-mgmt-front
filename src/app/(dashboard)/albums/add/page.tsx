import React from "react";

import { LuArrowLeft } from "react-icons/lu";

import PageTitle from "@/components/page-title";
import { AlbumForm } from "@/features/albums/components";

const page = () => {
  return (
    <div className="flex flex-col space-y-4">
      <PageTitle
        title="Add Album"
        url="/albums"
        btnTitle="Go Back"
        Icon={LuArrowLeft}
      />
      <AlbumForm />
    </div>
  );
};

export default page;
