import { Typography, Box, Button, Avatar } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import BlogCard from "../Dashboard/BlogCard";
import { useGetAllBlogsByUserId } from "../../Services/ReactQueryFiles/useGetAllBlogPostsByUserId";
import LoadingIndicator from "../../Utils/LoadingIndicator";
import { useGetFollowersList } from "../../Services/ReactQueryFiles/useGetFollowersList";
import { useGetFollowingList } from "../../Services/ReactQueryFiles/useGetFollowingList";
import { useGetMyDetails } from "../../Services/ReactQueryFiles/useGetMyDetails";
import { useFollowUser } from "../../Services/ReactQueryFiles/useFollowUser";
import { useEffect, useState } from "react";
import { useGetUserDetails } from "../../Services/ReactQueryFiles/useGetUserDetails";
import FollowersListModal from "./FollowersListModal";
import FollowingListModal from "./FollowingListModal";
import { useIsLoggedIn } from "../../Services/ReactQueryFiles/useIsLoggedIn";
import { useLogOut } from "../../Services/ReactQueryFiles/useLogout";
import { toast } from "react-toastify";

function UserProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [followingIdList, setFollowingIdList] = useState<any>();
  const [openFollower, setOpenFollowers] = useState(false);
  const [openFollowing, setOpenFollowing] = useState(false);
  const { logOutFn } = useLogOut();
  const { data: loggedIn, isLoading: isLoggedInLoading } = useIsLoggedIn();
  const { data: me, isLoading: isMyDataLoading } = useGetMyDetails();
  const {
    data: blogPosts,
    isLoading,
    refetch,
  } = useGetAllBlogsByUserId(Number(id));
  const {
    data: followers,
    isLoading: isFollowersLoading,
    refetch: refetchFollowersList,
  } = useGetFollowersList(Number(id));
  const {
    data: following,
    isLoading: isFollowingLoading,
    refetch: refetchFollowingList,
  } = useGetFollowingList(Number(id));
  const { data: userDetails, isLoading: isUserDetailsLoading } =
    useGetUserDetails(Number(id));

  const { followUserFn, isPending } = useFollowUser();

  if (
    isLoading ||
    isFollowersLoading ||
    isFollowingLoading ||
    isMyDataLoading ||
    isPending ||
    isUserDetailsLoading ||
    isLoggedInLoading
  )
    <LoadingIndicator />;

  useEffect(() => {
    if (!isFollowersLoading && followers !== undefined) {
      const followerUserIds = followers.data.followers.map(
        (followerUser: any) => followerUser.follower_id
      );
      setFollowingIdList(followerUserIds);
    }
  }, [followers]);

  useEffect(() => {
    refetchFollowersList();
    refetchFollowingList();
  }, [id]);

  function handleFollowUser() {
    followUserFn(
      { id: Number(id) },
      {
        onSuccess() {
          refetchFollowersList();
          refetchFollowingList();
          toast.success("Followed User Successfully");
        },
      }
    );
  }

  function handleUnfollowUser() {
    followUserFn(
      { id: Number(id) },
      {
        onSuccess() {
          refetchFollowersList();
          refetchFollowingList();
          toast.success("Unfollowed User Successfully");
        },
      }
    );
  }

  function showFollowersModal() {
    setOpenFollowers(true);
  }
  function showFollowingModal() {
    setOpenFollowing(true);
  }

  function closeModal() {
    setOpenFollowers(false);
    setOpenFollowing(false);
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "10px",
          padding: "10px",
          border: 1,
          borderRadius: "10px",
          marginBottom: "5px",
          backgroundColor: "whitesmoke",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Avatar>{userDetails?.data.data.name.slice(0, 2)}</Avatar>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Button
              variant="contained"
              onClick={() => navigate("/")}
              sx={{ borderRadius: "10px" }}
            >
              Home
            </Button>
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
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Box>
        <Typography>Name : {userDetails?.data.data.name}</Typography>
        <Typography>Email : {userDetails?.data.data.email}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "10px",
          padding: "10px",
          border: 1,
          borderRadius: "10px",
          marginBottom: "5px",
          backgroundColor: "whitesmoke",
        }}
      >
        {!isFollowersLoading && (
          <Button onClick={() => showFollowersModal()}>
            <Typography
              sx={{
                backgroundColor: "wheat",
                borderRadius: "20px",
                padding: "10px",
                border: 2,
                borderColor: "cyan",
              }}
            >
              {followers.data.count.followerCount} Followers
            </Typography>
          </Button>
        )}
        {!isFollowingLoading && (
          <Button onClick={() => showFollowingModal()}>
            <Typography
              sx={{
                backgroundColor: "wheat",
                borderRadius: "20px",
                padding: "10px",
                border: 2,
                borderColor: "cyan",
              }}
            >
              {following.data.count.followingCount} Following
            </Typography>
          </Button>
        )}
        <Button
          variant="contained"
          disabled={
            me?.data.data.id == id ||
            isPending ||
            followingIdList?.includes(me?.data.data.id)
          }
          onClick={() => handleFollowUser()}
        >
          + Follow
        </Button>
        <Button
          variant="contained"
          disabled={
            me?.data.data.id == id ||
            isPending ||
            !followingIdList?.includes(me?.data.data.id)
          }
          onClick={() => handleUnfollowUser()}
          color="warning"
        >
          - Unfollow
        </Button>
      </Box>
      <Box>
        {!isLoading &&
        blogPosts &&
        blogPosts.data &&
        blogPosts?.data.length > 0 ? (
          blogPosts?.data.map((blog: any) => {
            return (
              <BlogCard
                userProfile={blog.name}
                blogDetails={blog}
                title={blog.title}
                countryFlag={blog.country}
                description={blog.content}
                deletable={me?.data.data.id == id}
                refetch={refetch}
              />
            );
          })
        ) : (
          <Typography>No Blog Posts Created By This User</Typography>
        )}
      </Box>
      <FollowersListModal
        open={openFollower}
        close={closeModal}
        data={followers}
      />
      <FollowingListModal
        open={openFollowing}
        close={closeModal}
        data={following}
      />
    </Box>
  );
}

export default UserProfile;
