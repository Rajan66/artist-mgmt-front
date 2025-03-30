import React from "react";

import { LuArrowLeft } from "react-icons/lu";

import PageTitle from "@/components/page-title";
import { AlbumEditForm } from "@/features/albums/components";

const page = () => {
  return (
    <div className="flex flex-col space-y-4">
      <PageTitle
        title="Edit Album"
        url="/albums"
        btnTitle="Go Back"
        Icon={LuArrowLeft}
      />
      <AlbumEditForm />
    </div>
  );
};

export default page;
