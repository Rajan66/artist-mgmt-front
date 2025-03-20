import { TEnv } from "@/types";

const envConfig: TEnv = {
  APP_BASE_URL: process.env.APP_BASE_URL!,
  API_BASE_URL: process.env.API_BASE_URL!,
};

export default envConfig;
