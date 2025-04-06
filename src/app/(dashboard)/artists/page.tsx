import { redirect } from "next/navigation";

import { LuCirclePlus } from "react-icons/lu";

import PageTitle from "@/components/page-title";
import { ArtistTable } from "@/features/artists/components";
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
        title="Artists"
        url="/artists/add"
        btnTitle="Add Artist"
        Icon={<LuCirclePlus />}
      />
      <ArtistTable />
    </div>
  );
};

export default page;
