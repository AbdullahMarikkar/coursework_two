import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteBlog } from "../blogPostsService";

export function useDeleteBlogPost() {
  const { mutate: deleteBlogFn, isPending } = useMutation({
    mutationFn: deleteBlog,
    onSuccess() {
      toast.success("Blog Deleted Successfully");
    },
    onError(err: any) {
      toast.error(`${err.response?.data?.error}`);
    },
  });

  return { deleteBlogFn, isPending };
}
