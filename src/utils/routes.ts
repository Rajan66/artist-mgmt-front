export const apiPrefix = "api/v1/";

export const publicRoutes = [""];
export const authRoutes = ["/login", "/register"];
export const adminRoutes = ["/dashboard"]; // TODO everything requires auth
export const protectedRoutes = [
  "/",
  "/artists",
  "/artists/add",
  "/artists/[id]",
  "/artists/[id]/albums",
  "/artists/[id]/albums/songs",
  "/artists/detail/[id]",
  "/users",
  "/users/add",
  "/users/[id]",
  "/albums",
  "/albums/add",
  "/albums/[id]",
  "/albums/detail/[id]",
  "/songs",
  "/songs/add",
  "/songs/[id]",
  "/settings",
  "/help",
  "/managers",
  "/managers/[id]",
  "/managers/add",
];
