import { useQuery } from "@tanstack/react-query";
import { getCountryRecordByBlogId } from "../countryService";

export function useGetCountryRecordForBlog(id: number) {
  const { data, isLoading, refetch } = useQuery({
    queryFn: () => getCountryRecordByBlogId(id),
    queryKey: ["countryRecord", id],
  });

  return { data, isLoading, refetch };
}
