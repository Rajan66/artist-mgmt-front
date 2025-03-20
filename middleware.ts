import { NextRequest, NextResponse } from "next/server";
import { setCookie, getCookie } from "@/actions/cookies";
import { getRefreshToken } from "@/features/auth/actions";
import { decodeJwt } from "jose";
import { cookieExpiry } from "@/constants/app";

const adminRoutes = ["/", "/users"];
const managerRoutes = ["/", "/artists"];
const publicRoutes = ["/free"];
const authRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAuthRoute = authRoutes.includes(pathname);
  const isAdminRoute = adminRoutes.includes(pathname);
  const isManagerRoute = managerRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.includes(pathname);

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (isAdminRoute) {
    const access_token = await getCookie("access_token");
    if (!access_token) {
      const refresh_token = await getCookie("refresh_token");

      if (!refresh_token) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
      }
      const data = await getRefreshToken(refresh_token);

      // decode the token and get the expiry
      const access_token_exp = decodeJwt(data?.access_token)?.exp;
      const refresh_token_exp = decodeJwt(data?.access_token)?.exp;

      // set the expiry of the cookie and convert into seconds or get the default time
      setCookie(
        "access_token",
        data?.access_token,
        (access_token_exp ?? 0) * 1000 || cookieExpiry.ACCESS
      );
      setCookie(
        "refresh_token",
        data?.refresh_token,
        (refresh_token_exp ?? 0) * 1000 || cookieExpiry.REFRESH
      );

      return NextResponse.next();
    }
  }

  if (isManagerRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}
