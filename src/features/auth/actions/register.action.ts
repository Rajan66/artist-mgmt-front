import { TRegister } from "@/features/auth/schemas";
import { PostRequest } from "@/lib/axios/axios";

export const register = async (payload: TRegister) => {
  try {
    const response = await PostRequest("api/v1/auth/register", {
      body: payload,
    });
    const data = response.data;
    return response;
  } catch (error) {
    console.error(error);
  }
};
