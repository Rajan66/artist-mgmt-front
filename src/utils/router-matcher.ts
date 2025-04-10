import { protectedRoutes } from "./routes";

export function matchProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some((pattern: any) => {
    const regexPattern =
      "^" +
      pattern
        .replace(/\[(.*?)\]/g, "[^/]+") 
        .replace(/\//g, "\\/") + 
      "$";

    const regex = new RegExp(regexPattern);
    return regex.test(pathname);
  });
}
