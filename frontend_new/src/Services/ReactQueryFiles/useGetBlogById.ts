import { useQuery } from "@tanstack/react-query";
import { getBlogById } from "../blogPostsService";

export function useGetBlogById(id: number) {
  const { data, isLoading, refetch } = useQuery({
    queryFn: () => getBlogById(id),
    queryKey: ["blogComplete", id],
  });

  return { data, isLoading, refetch };
}
