import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetDashboardContent } from "../../Services/ReactQueryFiles/useGetDashboardContent";
import LoadingIndicator from "../../Utils/LoadingIndicator";
import BlogCard from "./BlogCard";
import { useRef, useState } from "react";
import { useSearchBlogPosts } from "../../Services/ReactQueryFiles/useSearchBlogPostsByName";
import SearchedModal from "./SearchedModal";
import { useLogOut } from "../../Services/ReactQueryFiles/useLogout";
import { useGetMyDetails } from "../../Services/ReactQueryFiles/useGetMyDetails";
import { useIsLoggedIn } from "../../Services/ReactQueryFiles/useIsLoggedIn";

function DashBoardScreen() {
  const navigate = useNavigate();
  const searchBar = useRef<any>("");
  const [openModal, setOpenModal] = useState(false);
  const [searchedData, setSearchedData] = useState<any>();
  const { data: loggedIn, isLoading: isLoggedInLoading } = useIsLoggedIn();
  const { data, isLoading } = useGetDashboardContent();
  const { searchBlogsFn, isPending } = useSearchBlogPosts();
  const { logOutFn, isPending: loggingOut } = useLogOut();
  const { data: me, isLoading: isMyDataLoading } = useGetMyDetails();

  if (
    isLoading ||
    isPending ||
    loggingOut ||
    isMyDataLoading ||
    isLoggedInLoading
  )
    <LoadingIndicator />;

  function handleSearchBlogs() {
    if (searchBar.current.value !== null && searchBar.current.value !== "") {
      searchBlogsFn(
        { name: searchBar.current.value },
        {
          onSuccess(data) {
            setSearchedData(data);
            searchBar.current.value = "";
            setOpenModal(true);
          },
        }
      );
    }
  }

  function closeModal() {
    setOpenModal(false);
  }

  return (
    <Box
      sx={{
        background:
          "linear-gradient(38deg, rgba(2,0,36,0.9747548677674195) 0%, #dadcb2 29%, #8adaee 93%)",
        minWidth: "100vh",
        minHeight: "100vh",
        // opacity: "70%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
        }}
      >
        {!isLoggedInLoading && loggedIn?.data?.isAuthenticated && (
          <Button
            onClick={() => navigate("/postblog")}
            variant="contained"
            sx={{ borderRadius: "30px" }}
          >
            + Create Blog Post
          </Button>
        )}
        {!isMyDataLoading && me && me.data && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              padding: "10px",
            }}
          >
            {!isLoggedInLoading && loggedIn?.data?.isAuthenticated && (
              <Button
                onClick={() => navigate(`/user/${Number(me.data.data.id)}`)}
                variant="contained"
                sx={{ borderRadius: "30px" }}
              >
                Profile
              </Button>
            )}
            {!isLoggedInLoading && loggedIn?.data?.isAuthenticated ? (
              <Button
                onClick={() => {
                  logOutFn();
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                variant="outlined"
                sx={{ backgroundColor: "cyan" }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
            )}
          </Box>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            sx={{
              backgroundColor: "white",
              margin: "10px",
              width: "40%",
            }}
            inputRef={searchBar}
          >
            Search Bar is Here
          </TextField>
          <Button
            variant="contained"
            onClick={() => handleSearchBlogs()}
            sx={{ fontSize: "17px", padding: "10px" }}
          >
            Search
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "5px",
            padding: "5px",
          }}
        >
          {!isLoading &&
            data.data.map((blog: any) => {
              return (
                <BlogCard
                  blogDetails={blog}
                  countryFlag={blog.country}
                  description={blog.content}
                  likeCount={blog.total_likes}
                  title={blog.title}
                  userProfile={blog.name}
                  deletable={false}
                  key={blog.id}
                ></BlogCard>
              );
            })}
        </Box>
      </Box>
      <SearchedModal
        data={searchedData}
        open={
          openModal &&
          searchedData !== undefined &&
          searchedData.data !== undefined
        }
        close={closeModal}
      />
    </Box>
  );
}

export default DashBoardScreen;
