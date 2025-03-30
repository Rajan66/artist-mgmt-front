import { NextRequest, NextResponse } from "next/server";

import { decodeJwt } from "jose";

import { getCookie, setCookie } from "@/actions/cookies";
import { cookieExpiry } from "@/constants/app";
import { getRefreshToken } from "@/features/auth/actions";
import {
  authRoutes,
  protectedRoutes,
  // adminRoutes,
  publicRoutes,
} from "@/utils/routes";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isAuthRoute = authRoutes.includes(pathname);
  // const isAdminRoute = adminRoutes.includes(pathname);
  const isProtectedRoute = !authRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.includes(pathname);

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (isProtectedRoute) {
    try {
      const access_token = await getCookie("access_token");

      if (!access_token) {
        const refresh_token = await getCookie("refresh_token");

        if (!refresh_token) {
          return NextResponse.redirect(new URL("/login", request.nextUrl));
        }

        try {
          const data = await getRefreshToken(refresh_token);

          if (!data?.access_token || !data?.refresh_token) {
            throw new Error(data);
          }

          let access_token_exp, refresh_token_exp;
          try {
            access_token_exp = decodeJwt(data.access_token)?.exp;
            refresh_token_exp = decodeJwt(data.refresh_token)?.exp;
          } catch (decodeError) {
            console.error("Error decoding JWT:", decodeError);
            return NextResponse.redirect(new URL("/login", request.nextUrl));
          }

          await setCookie(
            "access_token",
            data?.access_token,
            (access_token_exp ?? 0) * 1000 || cookieExpiry.ACCESS
          );
          await setCookie(
            "refresh_token",
            data?.refresh_token,
            (refresh_token_exp ?? 0) * 1000 || cookieExpiry.REFRESH
          );
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          return NextResponse.redirect(new URL("/login", request.nextUrl));
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
    return NextResponse.next();
  }

  if (isAuthRoute) {
    const referer = request.headers.get("referer");
    const refererUrl = referer ? new URL(referer) : null;
    const fromLoginPage = refererUrl?.pathname === "/login";

    if (fromLoginPage) {
      return NextResponse.next();
    }

    try {
      const access_token = await getCookie("access_token");
      const refresh_token = await getCookie("refresh_token");
      if (access_token || refresh_token) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
      }
    } catch (error) {
      console.error("Error checking auth state:", error);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}
