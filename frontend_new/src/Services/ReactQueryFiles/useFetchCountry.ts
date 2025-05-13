import { useQuery } from "@tanstack/react-query";
import { fetchCountryDetails } from "../countryService";

export function useFetchCountryDetails() {
  const { data, isLoading } = useQuery({
    queryFn: fetchCountryDetails,
    queryKey: ["country"],
  });

  return { data, isLoading };
}
