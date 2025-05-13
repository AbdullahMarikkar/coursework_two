import { createBrowserRouter } from "react-router-dom";
import AuthGuard from "./Utils/AuthGuard";
import Login from "./components/Authentication/Login";
import SignUp from "./components/Authentication/Signup";
import DashBoardScreen from "./components/Dashboard/DashboardScreen";
import BlogPost from "./components/Blog/BlogPost";
import CreateBlogPost from "./components/Blog/CreateBlogPost";
import UserProfile from "./components/User/UserProfile";

export const router = createBrowserRouter([
  { path: "login", element: <Login /> },
  { path: "signup", element: <SignUp /> },
  {
    path: "",
    element: <DashBoardScreen />,
  },
  {
    path: "/blog/:id",
    element: (
      <AuthGuard>
        <BlogPost />
      </AuthGuard>
    ),
  },
  {
    path: "/postblog",
    element: (
      <AuthGuard>
        <CreateBlogPost />
      </AuthGuard>
    ),
  },
  {
    path: "/user/:id",
    element: (
      <AuthGuard>
        <UserProfile />
      </AuthGuard>
    ),
  },
]);
