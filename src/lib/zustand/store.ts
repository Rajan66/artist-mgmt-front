import { create } from "zustand";
import { persist } from "zustand/middleware";

import { TArtist } from "@/features/artists/types/artist.type";

type ArtistStore = {
  artist: TArtist | null;
  setArtist: (artist: TArtist) => void;
  getArtist: () => TArtist | null;
};

export const useArtistStore = create<ArtistStore>((set, get) => ({
  artist: null,
  setArtist: (artist: TArtist) => set({ artist }),
  getArtist: () => {
    return get().artist;
  },
}));

type ProfileStore = {
  profileSkipped: boolean;
  setProfileSkipped: (skipped: boolean) => void;
};

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profileSkipped: false,
      setProfileSkipped: (skipped) => set({ profileSkipped: skipped }),
    }),
    {
      name: "profile-skip", // key in localStorage
    }
  )
);
