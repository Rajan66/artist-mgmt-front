import { TEnv } from "@/types";

const envConfig: TEnv = {
  APP_BASE_URL: process.env.APP_BASE_URL!,
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL!,
};

export default envConfig;
