import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchCountryByName } from "../countryService";

export function useGetCountryByName() {
  const { mutate: fetchCountryByNameFn, isPending } = useMutation({
    mutationFn: fetchCountryByName,
    onSuccess() {
      toast.success("Country Data Fetched Successfully");
    },
    onError(err: any) {
      toast.error(`${err.response?.data?.error}`);
    },
  });

  return { fetchCountryByNameFn, isPending };
}
