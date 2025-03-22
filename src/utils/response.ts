import { redirect } from "next/navigation";

import { AxiosError, AxiosResponse } from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ApiResponse = <T>(response: AxiosResponse<T>) => ({
  data: response?.data.data || null,
  status: response.status,
  statusText: response.statusText,
});

export const asyncHandler = async <T>(
  fn: () => Promise<AxiosResponse<T>>
): Promise<ReturnType<typeof ApiResponse<T>>> => {
  try {
    const response = await fn();
    return ApiResponse(response);
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        console.error("Error:", error.response?.data?.message);
      }
    } else {
      console.error("Async handler error:", error);
    }
    redirect("/login");
  }
};
