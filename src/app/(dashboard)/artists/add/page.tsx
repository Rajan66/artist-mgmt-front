import { redirect } from "next/navigation";
import React from "react";

import { LuArrowLeft } from "react-icons/lu";

import PageTitle from "@/components/page-title";
import { ArtistForm } from "@/features/artists/components";
import { getUser } from "@/utils/get-user-server";

export const dynamic = "force-dynamic";

const page = async () => {
  const user = await getUser();

  if (user?.role === "artist") {
    redirect("/");
  }

  return (
    <div className="flex flex-col space-y-4">
      <PageTitle
        title="Add Artist"
        url="/artists"
        Icon={<LuArrowLeft />}
        btnTitle="Go Back"
      />
      <ArtistForm />
    </div>
  );
};

export default page;
