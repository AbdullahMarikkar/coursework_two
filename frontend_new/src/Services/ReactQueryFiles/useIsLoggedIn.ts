import { useQuery } from "@tanstack/react-query";
import { isLoggedIn } from "../authenticate";

export function useIsLoggedIn() {
  const { data, isLoading, refetch } = useQuery({
    queryFn: isLoggedIn,
    queryKey: ["isAuthenticated"],
  });

  return { data, isLoading, refetch };
}
