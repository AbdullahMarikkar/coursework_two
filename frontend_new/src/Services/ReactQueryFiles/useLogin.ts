import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { login } from "../authenticate";

export function useLogin() {
  const { mutate: logInFn, isPending } = useMutation({
    mutationFn: login,
    onSuccess() {
      toast.success("User Logged In Successfully");
    },
    onError(err: any) {
      toast.error(`${err.response?.data?.error}`);
    },
  });

  return { logInFn, isPending };
}
