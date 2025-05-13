import { Navigate } from "react-router-dom";
import { useIsLoggedIn } from "../Services/ReactQueryFiles/useIsLoggedIn";
import LoadingIndicator from "./LoadingIndicator";
import { toast } from "react-toastify";

const AuthGuard = ({ children }: { children: any }) => {
  const { data, isLoading } = useIsLoggedIn();

  if (isLoading || !data) return <LoadingIndicator />;

  if (data?.data?.isAuthenticated) {
    return children;
  } else {
    toast.warning("Please Login for this Action");
    return <Navigate to="/" replace />;
  }
};

export default AuthGuard;
