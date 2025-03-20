import { cookies } from "next/headers";
import { TCookie } from "@/types";

export const setCookie = async (name: TCookie, value: string, date: number) => {
  const cookieStore = await cookies();
  cookieStore.set(name, value, {
    expires: new Date(date),
    secure: false, // true in production, cookie sent over only HTTPs
    httpOnly: true,
    sameSite: true,
  });
};

export const getCookie = async (name: TCookie) => {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
};

export const removeCookie = async (name: TCookie) => {
  const cookieStore = await cookies();
  cookieStore.delete(name);
};
