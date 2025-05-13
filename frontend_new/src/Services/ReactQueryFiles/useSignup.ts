import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signup } from "../authenticate";

export function useSignUp() {
  const { mutate: signUpFn, isPending } = useMutation({
    mutationFn: signup,
    onSuccess() {
      toast.success("User Signed Up Successfully");
    },
    onError(err: any) {
      toast.error(`${err.response?.data?.error}`);
    },
  });

  return { signUpFn, isPending };
}
