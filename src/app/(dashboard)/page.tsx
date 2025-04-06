import { redirect } from "next/navigation";

import { getArtistWithUser } from "@/features/artists/actions/artist.action";
import { getUser } from "@/utils/get-user-server";

export const dynamic = "force-dynamic";

const page = async () => {
  const user = await getUser();
  if (user?.role === "artist") {
    const artist = await getArtistWithUser(user.id);

    if (artist?.data) {
      redirect(`/artists/detail/${artist?.data.id}`);
    }
  }

  return <div className="text-primary-foreground">Dashboard overview page</div>;
};

export default page;
