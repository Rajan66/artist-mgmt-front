export type TUser = {
  id: string;
  email: string;
  role: "super_admin" | "artist_manager" | "artist";
  password: string;
  is_active: boolean;
  is_superuser: boolean;
  is_staff: boolean;
};

export type TCookieUser = {
  id: string;
  role: string;
  email: string;
};
