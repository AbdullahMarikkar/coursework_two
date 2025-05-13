import Cookie, { CookieSetOptions } from "universal-cookie";

const cookieOptions: CookieSetOptions = {
  path: "/",
  // sameSite: "lax",
  secure: false,
  domain: "localhost",
};

const cookies = new Cookie();

export const getAccessToken = (): string => {
  // return cookies.get("connect") as string;
  return cookies.get("accessToken") as string;
};

export const getApiKey = (): string => {
  // return cookies.get("connect") as string;
  return cookies.get("X-API-Key") as string;
};

export const getEmail = (): string => {
  return cookies.get("email") as string;
};

export const setAccessTokenToCookie = (accessToken: string): void => {
  cookies.set("accessToken", accessToken, cookieOptions);
};

export const setApiKeyToCookie = (apiKey: string): void => {
  cookies.set("X-API-Key", apiKey, cookieOptions);
};

export const removeAccessTokenFromCookie = (): void => {
  cookies.remove("accessToken", cookieOptions);
};

export const removeApiKeyFromCookie = (): void => {
  cookies.remove("X-API-Key", cookieOptions);
};

// export const getRefreshToken = (): string => {
//   return cookies.get("refreshToken") as string;
// };
// export const setRefreshTokenToCookie = (refreshToken: string): void => {
//   cookies.set("refreshToken", refreshToken, cookieOptions);
// };
// export const removeRefreshTokenFromCookie = (): void => {
//   cookies.remove("refreshToken", cookieOptions);
// };
