import React from "react";

import { LuCirclePlus } from "react-icons/lu";

import PageTitle from "@/components/page-title";
import { getArtistWithUser } from "@/features/artists/actions/artist.action";
import { ManagerDetail } from "@/features/artists/components";
import { getUserProfile } from "@/features/users/actions/user.action";
import { ManagerTable } from "@/features/users/components";
import { getUser } from "@/utils/get-user-server";

const page = async () => {
  const user = await getUser();

  const foundUser =
    user?.role === "artist"
      ? await getArtistWithUser(user?.id)
      : user?.role === "super_admin"
        ? await getUserProfile(user?.id)
        : null;

  if (user?.role === "super_admin" && foundUser?.data?.user?.is_superuser) {
    return (
      <div className="flex flex-col space-y-4">
        <PageTitle
          title="Managers"
          url="/managers/add"
          btnTitle="Add Manager"
          Icon={<LuCirclePlus />}
        />
        <ManagerTable />
      </div>
    );
  }

  return (
    <>
      {!foundUser?.data.manager_id ? (
        <div className="flex items-center justify-center">
          <h2 className="text-2xl font-semibold">
            {`Oops... you don't have a manager`}
          </h2>
        </div>
      ) : (
        <div className="flex flex-col space-y-8">
          <h2 className="font-semibold text-2xl opacity-90">Manager Details</h2>
          <ManagerDetail manager_id={foundUser?.data?.manager_id} />
        </div>
      )}
    </>
  );
};

export default page;
