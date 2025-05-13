import { useQuery } from "@tanstack/react-query";
import { getLikeStateForBlog } from "../blogPostsService";

export function useGetLikeStateForBlog(id: number) {
  const { data, isLoading, refetch } = useQuery({
    queryFn: () => getLikeStateForBlog(id),
    queryKey: ["likeState", id],
  });

  return { data, isLoading, refetch };
}
