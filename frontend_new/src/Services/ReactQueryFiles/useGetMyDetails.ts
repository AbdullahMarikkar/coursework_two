import { useQuery } from "@tanstack/react-query";
import { getMyDetails } from "../authenticate";

export function useGetMyDetails() {
  const { data, isLoading, refetch } = useQuery({
    queryFn: () => getMyDetails(),
    queryKey: ["me"],
  });

  return { data, isLoading, refetch };
}
