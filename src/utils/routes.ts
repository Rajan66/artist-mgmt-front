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
  "/users",
  "/users/add",
  "/users/[id]",
  "/albums",
  "/albums/add",
  "/albums/[id]",
  "/songs",
  "/songs/add",
  "/songs/[id]",
  "/settings",
  "/help",
  "/artists/detail/:id",
  "/albums/detail/:id",
  "/managers",
];
