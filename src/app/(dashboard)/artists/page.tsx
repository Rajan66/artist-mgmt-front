import { LuCirclePlus } from "react-icons/lu";

import PageTitle from "@/components/page-title";
import { ArtistTable } from "@/features/artists/components";

const page = () => {
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
