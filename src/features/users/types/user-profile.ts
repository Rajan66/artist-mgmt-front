import { TUser } from "@/types";

export type TManager = {
  id: string;
  user: TUser;
  first_name: string;
  last_name: string;
  dob: Date;
  gender: "M" | "F";
  address: string;
  phone: string;
  created_at: Date;
  updated_at: Date;
};
