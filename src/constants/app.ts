export const AXIOS_TIMEOUT = 10000;

export const cookieExpiry = {
  ACCESS: Date.now() + 15 * 60 * 1000 /* 15 mins */,
  REFRESH: Date.now() + 60 * 60 * 24 * 2 * 1000 /* 48 hours */,
};
