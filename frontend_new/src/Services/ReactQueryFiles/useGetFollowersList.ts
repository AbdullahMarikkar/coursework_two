import { useQuery } from "@tanstack/react-query";
import { getFollowersList } from "../blogPostsService";

export function useGetFollowersList(id: number) {
  const { data, isLoading, refetch } = useQuery({
    queryFn: () => getFollowersList(id),
    queryKey: ["followers"],
  });

  return { data, isLoading, refetch };
}
