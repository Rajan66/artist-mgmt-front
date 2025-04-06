export type TUser = {
  email: string;
  role: "super_admin" | "artist_manager" | "artist";
  password: string;
};

export type TCookieUser = {
  id: string;
  role: string;
  email: string;
};
