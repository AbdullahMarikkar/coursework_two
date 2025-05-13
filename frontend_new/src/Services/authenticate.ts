import axiosInstance from "../Utils/axiosInstance";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data } = await axiosInstance.post(`/auth/login`, {
    email,
    password,
  });

  return data;
};

export const signup = async ({
  email,
  password,
  username,
}: {
  email: string;
  username: string;
  password: string;
}) => {
  const { data } = await axiosInstance.post(`/auth/register`, {
    email,
    name: username,
    password,
  });

  return data;
};

export const logOut = async () => {
  const { data } = await axiosInstance.post(`/auth/logout`);

  return data;
};

export const isLoggedIn = async () => {
  try {
    const data = await axiosInstance.get("/auth/isLoggedIn", {
      withCredentials: true,
    });

    return data;
  } catch (err) {
    return err as any;
  }
};

export const getUserDetailsById = async (id: number) => {
  const data = await axiosInstance.get(`/auth/${id}`);

  return data;
};

export const getMyDetails = async () => {
  const data = await axiosInstance.get(`/auth/check/me`);

  return data;
};
