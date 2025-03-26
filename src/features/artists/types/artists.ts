import { TUser } from "@/types/index";

export type TArtist = {
  id: string;
  user: TUser;
  name: string;
  first_release_year: number;
  no_of_albums_released: number;
  first_name: string;
  last_name: string;
  dob: Date;
  gender: "M" | "F";
  address: string;
  created_at: Date;
  updated_at: Date;
};
