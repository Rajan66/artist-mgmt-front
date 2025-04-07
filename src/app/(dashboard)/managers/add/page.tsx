import { redirect } from "next/navigation";
import React from "react";

import { LuArrowLeft } from "react-icons/lu";

import PageTitle from "@/components/page-title";
import { ManagerForm } from "@/features/users/components";
import { getUser } from "@/utils/get-user-server";

export const dynamic = "force-dynamic";

const page = async () => {
  const user = await getUser();

  if (user?.role === "artist" || user?.role === "artist_manager") {
    redirect("/");
  }

  return (
    <div className="flex flex-col space-y-4">
      <PageTitle
        title="Add Manager"
        url="/managers"
        Icon={<LuArrowLeft />}
        btnTitle="Go Back"
      />
      <ManagerForm />
    </div>
  );
};

export default page;
