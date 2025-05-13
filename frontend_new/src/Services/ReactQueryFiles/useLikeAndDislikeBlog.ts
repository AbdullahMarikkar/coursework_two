import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { likeAndDislikeBlog } from "../blogPostsService";

export function useLikeAndDislikeBlog() {
  const { mutate: likeAndDislikeBlogFn, isPending } = useMutation({
    mutationFn: likeAndDislikeBlog,

    onError(err: any) {
      toast.error(`${err.response?.data?.error}`);
    },
  });

  return { likeAndDislikeBlogFn, isPending };
}
