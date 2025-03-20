import axios from "axios";

import { getCookie } from "@/actions/cookies";
import { AXIOS_TIMEOUT } from "@/constants/app";

import envConfig from "@/config/env";

const instance = axios.create({
  baseURL: envConfig.API_BASE_URL,
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
    console.log("error");
    return Promise.reject(err);
  }
);

export default instance;
