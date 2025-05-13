import { useQuery } from "@tanstack/react-query";
import { getLikesCountForBlog } from "../blogPostsService";

export function useGetLikeCountForBlog(id: number) {
  const { data, isLoading, refetch } = useQuery({
    queryFn: () => getLikesCountForBlog(id),
    queryKey: ["likesCount", id],
  });

  return { data, isLoading, refetch };
}
