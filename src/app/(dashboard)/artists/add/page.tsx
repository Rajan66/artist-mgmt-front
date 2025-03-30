import React from "react";

import { LuArrowLeft } from "react-icons/lu";

import PageTitle from "@/components/page-title";
import { ArtistForm } from "@/features/artists/components";

const page = () => {
  return (
    <div className="flex flex-col space-y-4">
      <PageTitle
        title="Add Artist"
        url="/artists"
        Icon={LuArrowLeft}
        btnTitle="Go Back"
      />
      <ArtistForm />
    </div>
  );
};

export default page;
