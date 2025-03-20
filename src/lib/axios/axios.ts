import { AxiosRequestConfig } from "axios";
import axios from "./interceptor";

export const api = process.env.NEXT_PUBLIC_API;

export const GetRequest = (
  url: string,
  data?: any,
  config: AxiosRequestConfig = {}
) => {
  config.params = data;
  return axios.get(url, config);
};

export const PostRequest = (
  url: string,
  data?: any,
  config: AxiosRequestConfig = {}
) => {
  return axios.post(url, data, config);
};

export const PutRequest = (
  url: string,
  data?: any,
  config: AxiosRequestConfig = {}
) => {
  return axios.put(url, data, config);
};

export const PatchRequest = (
  url: string,
  data?: any,
  config: AxiosRequestConfig = {}
) => {
  return axios.patch(url, data, config);
};

export const DeleteRequest = (url: string, config: AxiosRequestConfig = {}) => {
  return axios.delete(url, config);
};
