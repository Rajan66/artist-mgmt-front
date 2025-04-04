import React from "react";

import { LuArrowLeft } from "react-icons/lu";

import PageTitle from "@/components/page-title";
import { SongEditForm } from "@/features/songs/components";

const page = () => {
  return (
    <div className="flex flex-col space-y-4">
      <PageTitle title="Edit Song" btnTitle="Go Back" Icon={<LuArrowLeft />} />
      <SongEditForm />
    </div>
  );
};

export default page;
