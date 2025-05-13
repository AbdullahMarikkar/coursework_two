import { useQuery } from "@tanstack/react-query";
import { getDashboardContent } from "../blogPostsService";

export function useGetDashboardContent() {
  const { data, isLoading, refetch } = useQuery({
    queryFn: () => getDashboardContent(),
    queryKey: ["dashboard"],
  });

  return { data, isLoading, refetch };
}
