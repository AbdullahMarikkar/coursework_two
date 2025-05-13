import axiosInstance from "../Utils/axiosInstance";

export const getDashboardContent = async () => {
  const { data } = await axiosInstance.get(`/dashboard/0`);

  return data;
};

export const getAllCommentsForBlog = async (id: number) => {
  const { data } = await axiosInstance.get(`/interaction/comment/${id}`);

  return data;
};

export const getBlogById = async (id: number) => {
  const { data } = await axiosInstance.get(`/blog/${id}`);

  return data;
};

export const getLikesCountForBlog = async (id: number) => {
  const { data } = await axiosInstance.get(`/interaction/likeCount/${id}`);

  return data;
};

export const likeAndDislikeBlog = async ({
  id,
  like,
}: {
  id: number;
  like: boolean;
}) => {
  const { data } = await axiosInstance.post(`/interaction/like/${id}`, {
    like,
  });

  return data;
};

export const getLikeStateForBlog = async (id: number) => {
  const { data } = await axiosInstance.get(`/interaction/like/${id}`);

  return data;
};

export const getFollowingList = async (id: number) => {
  const { data } = await axiosInstance.get(`/interaction/following/${id}`);

  return data;
};

export const getFollowersList = async (id: number) => {
  const { data } = await axiosInstance.get(`/interaction/followers/${id}`);

  return data;
};

export const followUser = async ({ id }: { id: number }) => {
  const { data } = await axiosInstance.post(`/interaction/follow/${id}`);

  return data;
};

export const addComment = async ({
  comment,
  id,
}: {
  comment: string;
  id: number;
}) => {
  const { data } = await axiosInstance.post(`/interaction/comment/${id}`, {
    comment,
  });

  return data;
};

export const addBlogPost = async ({
  country,
  title,
  content,
}: {
  country: string;
  title: string;
  content: string;
}) => {
  const { data } = await axiosInstance.post(`/blog`, {
    country,
    title,
    content,
  });

  return data;
};

export const getAllBlogPostsByUserId = async (id: number) => {
  const { data } = await axiosInstance.get(`/blog/byUser/${id}`);

  return data;
};

export const searchBlogPosts = async ({ name }: { name: string }) => {
  if (name !== null && name !== "") {
    const { data } = await axiosInstance.get(`/posts/search?country=${name}`);

    return data;
  }
  return null;
};

export const deleteBlog = async ({ id }: { id: number }) => {
  const { data } = await axiosInstance.delete(`/blog/${id}`);

  return data;
};
