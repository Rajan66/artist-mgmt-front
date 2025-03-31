import React from "react";

import { LuArrowLeft } from "react-icons/lu";

import PageTitle from "@/components/page-title";
import { SongForm } from "@/features/songs/components";

const page = () => {
  return (
    <div className="flex flex-col space-y-4">
      <PageTitle
        title="Add Song"
        url="/songs"
        btnTitle="Go Back"
        Icon={LuArrowLeft}
      />
      <SongForm />
    </div>
  );
};

export default page;
