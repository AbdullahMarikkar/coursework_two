import { useQuery } from "@tanstack/react-query";
import { getAllCommentsForBlog } from "../blogPostsService";

export function useGetAllCommentForBlog(id: number) {
  const { data, isLoading, refetch } = useQuery({
    queryFn: () => getAllCommentsForBlog(id),
    queryKey: ["comments", id],
  });

  return { data, isLoading, refetch };
}
