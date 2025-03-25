import axios from "axios";

import { getCookie } from "@/actions/cookies";
import envConfig from "@/config/env";
import { AXIOS_TIMEOUT } from "@/constants/app";

const instance = axios.create({
  baseURL: envConfig.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  timeout: AXIOS_TIMEOUT,
});

instance.interceptors.request.use(
  async (config) => {
    const accessToken = await getCookie("access_token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (err) => {
    console.error(err);
    return Promise.reject(err);
  }
);

export default instance;
