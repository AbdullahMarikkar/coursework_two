import { useQuery } from "@tanstack/react-query";
import { getAllBlogPostsByUserId } from "../blogPostsService";

export function useGetAllBlogsByUserId(id: number) {
  const { data, isLoading, refetch } = useQuery({
    queryFn: () => getAllBlogPostsByUserId(id),
    queryKey: ["blogsByUser", id],
  });

  return { data, isLoading, refetch };
}
