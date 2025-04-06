import { redirect } from "next/navigation";
import React from "react";

import { LuArrowLeft } from "react-icons/lu";

import PageTitle from "@/components/page-title";
import { ArtistEditForm } from "@/features/artists/components";
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
        title="Edit Artist"
        btnTitle="Go Back"
        Icon={<LuArrowLeft />}
      />
      <ArtistEditForm />
    </div>
  );
};

export default page;
