import { LuCirclePlus } from "react-icons/lu";

import PageTitle from "@/components/page-title";
import { AlbumTable } from "@/features/albums/components";
import { ArtistAlbumTable } from "@/features/albums/components/artist";
import { getUser } from "@/utils/get-user-server";

const page = async () => {
  const user = await getUser();

  return (
    <div className="flex flex-col space-y-4">
      <PageTitle
        title="Albums"
        url="/albums/add"
        btnTitle="Add Album"
        Icon={<LuCirclePlus />}
      />
      {user && (
        <>
          {user.role === "artist" ? (
            <ArtistAlbumTable user={user} />
          ) : (
            <AlbumTable />
          )}
        </>
      )}
    </div>
  );
};

export default page;
