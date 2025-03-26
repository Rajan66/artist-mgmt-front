export const apiPrefix = "api/v1/";

export const publicRoutes = [""];
export const authRoutes = ["/login", "/register"];
export const adminRoutes = ["/dashboard"]; // TODO everything requires auth
export const protectedRoutes = [
  "/",
  "/artists",
  "/artists/add",
  "/users",
  "/albums",
  "/songs",
];
