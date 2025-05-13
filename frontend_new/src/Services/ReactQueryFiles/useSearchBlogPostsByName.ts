import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { searchBlogPosts } from "../blogPostsService";

export function useSearchBlogPosts() {
  const { mutate: searchBlogsFn, isPending } = useMutation({
    mutationFn: searchBlogPosts,
    onSuccess() {
      toast.success("Blogs Searched Successfully");
    },
    onError(err: any) {
      toast.error(`${err.response?.data?.error}`);
    },
  });

  return { searchBlogsFn, isPending };
}
