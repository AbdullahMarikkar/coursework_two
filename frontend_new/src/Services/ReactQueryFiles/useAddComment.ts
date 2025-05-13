import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addComment } from "../blogPostsService";

export function useAddComment() {
  const { mutate: addCommentFn, isPending } = useMutation({
    mutationFn: addComment,
    onSuccess() {
      toast.success("Comment Added Successfully");
    },
    onError(err: any) {
      toast.error(`${err.response?.data?.error}`);
    },
  });

  return { addCommentFn, isPending };
}
