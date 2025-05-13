import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addBlogPost } from "../blogPostsService";

export function useAddBlogPost() {
  const { mutate: addBlogPostFn, isPending } = useMutation({
    mutationFn: addBlogPost,
    onSuccess() {
      toast.success("Blog Post Added Successfully");
    },
    onError(err: any) {
      toast.error(`${err.response?.data?.error}`);
    },
  });

  return { addBlogPostFn, isPending };
}
