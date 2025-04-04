import React from "react";

import { LuArrowLeft } from "react-icons/lu";

import PageTitle from "@/components/page-title";
import { ArtistEditForm } from "@/features/artists/components";

const page = () => {
  return (
    <div className="flex flex-col space-y-4">
      <PageTitle
        title="Edit Artist"
        btnTitle="Go Back"
        Icon={<LuArrowLeft />}
      />
      <ArtistEditForm />
    </div>
  );
};

export default page;
