import { useEffect } from "react";

import { useGetArtistWithUser } from "@/features/artists/hooks/use-queries";
import { useArtistStore } from "@/lib/zustand/store";

export const useArtistData = (userId: string) => {
  const { setArtist } = useArtistStore();
  const { data: artist } = useGetArtistWithUser(userId);

  useEffect(() => {
    if (artist?.data) {
      setArtist(artist?.data);
    }
  }, [artist, setArtist]);
};
