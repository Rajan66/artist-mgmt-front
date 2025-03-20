import axios from "axios";

export const getRefreshToken = async (token: string) => {
  try {
    const response = await axios.post("api/v1/auth/refresh-token/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};
