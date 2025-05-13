import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { followUser } from "../blogPostsService";

export function useFollowUser() {
  const { mutate: followUserFn, isPending } = useMutation({
    mutationFn: followUser,

    onError(err: any) {
      toast.error(`${err.response?.data?.error}`);
    },
  });

  return { followUserFn, isPending };
}
