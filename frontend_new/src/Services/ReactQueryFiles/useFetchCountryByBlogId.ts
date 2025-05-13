import { useQuery } from "@tanstack/react-query";
import { getCountryRecordByBlogId } from "../countryService";

export function useFetchCountryByBlogId({ id }: { id: number }) {
  const { data, isLoading, refetch } = useQuery({
    queryFn: () => getCountryRecordByBlogId(id),
    queryKey: ["country", name],
  });

  return { data, isLoading, refetch };
}
