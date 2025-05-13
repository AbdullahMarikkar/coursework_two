import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createCountryRecordForBlog } from "../countryService";

export function useCreateCountryRecord() {
  const { mutate: createCountryRecordFn, isPending } = useMutation({
    mutationFn: createCountryRecordForBlog,
    onSuccess() {
      toast.success("Country Record Created Successfully for Blog");
    },
    onError(err: any) {
      toast.error(`${err.response?.data?.error}`);
    },
  });

  return { createCountryRecordFn, isPending };
}
