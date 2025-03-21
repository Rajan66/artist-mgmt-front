import { GetRequest } from "@/lib/axios/axios";

export const getSongs = async () => {
  try {
    const response = await GetRequest("api/v1/songs/");
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};
