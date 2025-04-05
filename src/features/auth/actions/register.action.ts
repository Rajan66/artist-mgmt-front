import { TRegister } from "@/features/auth/schemas";
import { PostRequest } from "@/lib/axios/axios";
import { asyncHandler } from "@/utils/response";

export const register = async (payload: TRegister) => {
  try {
    const response = await PostRequest("api/v1/auth/register", {
      body: payload,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const registerWithProfile = async (payload: any) => {
  try {
    const response = await PostRequest(
      "/api/v1/auth/register/profile/",
      payload
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
