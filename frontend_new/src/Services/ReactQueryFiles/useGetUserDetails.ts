import { useQuery } from "@tanstack/react-query";
import { getUserDetailsById } from "../authenticate";

export function useGetUserDetails(id: number) {
  const { data, isLoading, refetch } = useQuery({
    queryFn: () => getUserDetailsById(id),
    queryKey: ["user", id],
  });

  return { data, isLoading, refetch };
}
