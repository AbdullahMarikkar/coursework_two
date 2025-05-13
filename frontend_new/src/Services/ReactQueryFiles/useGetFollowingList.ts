import { useQuery } from "@tanstack/react-query";
import { getFollowingList } from "../blogPostsService";

export function useGetFollowingList(id: number) {
  const { data, isLoading, refetch } = useQuery({
    queryFn: () => getFollowingList(id),
    queryKey: ["following"],
  });

  return { data, isLoading, refetch };
}
