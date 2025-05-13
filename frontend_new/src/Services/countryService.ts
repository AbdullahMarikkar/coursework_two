import axiosInstance from "../Utils/axiosInstance";

export const fetchCountryDetails = async () => {
  const { data } = await axiosInstance.get(`/country`);

  return data;
};

export const fetchCountryByName = async ({ name }: { name: string }) => {
  if (name !== null && name !== "") {
    const { data } = await axiosInstance.get(`/country/${name}`);

    return data;
  }
  return null;
};

export const getCountryRecordByBlogId = async (id: number) => {
  const { data } = await axiosInstance.get(`/country/record/${id}`);

  return data;
};

export const createCountryRecordForBlog = async ({
  name,
  currency,
  capital,
  language,
  flag,
  blog_id,
}: {
  name: string;
  currency: string;
  capital: string;
  language: string;
  flag: string;
  blog_id: number;
}) => {
  const { data } = await axiosInstance.post(`/country/record`, {
    name,
    capital,
    currency,
    language,
    flag,
    blog_id,
  });

  return data;
};
