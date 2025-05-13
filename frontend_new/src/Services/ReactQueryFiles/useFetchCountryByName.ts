import { useQuery } from "@tanstack/react-query";
import { fetchCountryByName } from "../countryService";

export function useFetchCountryByName({ name }: { name: string }) {
  const { data, isLoading, refetch } = useQuery({
    queryFn: () => fetchCountryByName({ name }),
    queryKey: ["country", name],
  });

  return { data, isLoading, refetch };
}
