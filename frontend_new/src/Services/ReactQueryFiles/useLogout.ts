import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { logOut } from "../authenticate";
import { useNavigate } from "react-router-dom";
import {
  removeAccessTokenFromCookie,
  removeApiKeyFromCookie,
} from "../../Utils/cookieService";

export function useLogOut() {
  const navigate = useNavigate();
  const { mutate: logOutFn, isPending } = useMutation({
    mutationFn: logOut,
    onSuccess() {
      toast.success("User Logged Out Successfully");
      removeAccessTokenFromCookie();
      removeApiKeyFromCookie();
      navigate("/login");
    },
    onError() {
      toast.error("Log Out Failed, Please Try again");
    },
  });

  return { logOutFn, isPending };
}
