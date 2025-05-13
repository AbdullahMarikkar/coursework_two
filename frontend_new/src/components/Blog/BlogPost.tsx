import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useGetAllCommentForBlog } from "../../Services/ReactQueryFiles/useGetAllComentsForBlog";
import LoadingIndicator from "../../Utils/LoadingIndicator";
import { useGetLikeCountForBlog } from "../../Services/ReactQueryFiles/useGetLikesCountForBlog";
import { useGetLikeStateForBlog } from "../../Services/ReactQueryFiles/useGetLikeStateForBlog";
import { useLikeAndDislikeBlog } from "../../Services/ReactQueryFiles/useLikeAndDislikeBlog";
import { toast } from "react-toastify";
import { useRef } from "react";
import { useAddComment } from "../../Services/ReactQueryFiles/useAddComment";
import { useGetUserDetails } from "../../Services/ReactQueryFiles/useGetUserDetails";
import { useFetchCountryByBlogId } from "../../Services/ReactQueryFiles/useFetchCountryByBlogId";
import { useGetBlogById } from "../../Services/ReactQueryFiles/useGetBlogById";
import { useGetMyDetails } from "../../Services/ReactQueryFiles/useGetMyDetails";
import { useIsLoggedIn } from "../../Services/ReactQueryFiles/useIsLoggedIn";
import { useLogOut } from "../../Services/ReactQueryFiles/useLogout";

// TODO : Improve Authentication
// TODO : Add Pagination for Dashboard
// TODO : If no blog posts in user profile show a message
// TODO : Record Video
// TODO : Improve UI

function BlogPost() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("u");
  const navigate = useNavigate();
  const { data, isLoading } = useIsLoggedIn();
  const { logOutFn } = useLogOut();
  const {
    data: comments,
    isLoading: isLoadingComments,
    refetch: refetchComments,
  } = useGetAllCommentForBlog(Number(id));
  const {
    data: likeCount,
    isLoading: isLoadingLikeCount,
    refetch: refetchLikeCount,
  } = useGetLikeCountForBlog(Number(id));
  const {
    data: likeState,
    isLoading: isLikeStateLoading,
    refetch: refetchLikeState,
  } = useGetLikeStateForBlog(Number(id));
  const { data: userDetails, isLoading: isLoadingUserDetails } =
    useGetUserDetails(Number(userId));
  const { data: blog, isLoading: isBlogLoading } = useGetBlogById(Number(id));
  const { data: countryDetails, isLoading: isLoadingCountryDetails } =
    useFetchCountryByBlogId({ id: Number(id) });
  const { data: me, isLoading: isMyDataLoading } = useGetMyDetails();

  const { likeAndDislikeBlogFn, isPending } = useLikeAndDislikeBlog();
  const { addCommentFn, isPending: isPendingAddingComment } = useAddComment();

  const commentField = useRef<any>(null);

  function handleSubmitComment() {
    if (
      commentField.current.value == "" ||
      commentField.current.value == null
    ) {
      return toast.warn("Add a Comment before Submitting");
    }
    addCommentFn(
      { comment: commentField.current.value, id: Number(id) },
      {
        onSuccess() {
          refetchComments();
          commentField.current.value = "";
        },
      }
    );
  }

  if (
    isLoadingComments ||
    isLoadingLikeCount ||
    isLikeStateLoading ||
    isPending ||
    isPendingAddingComment ||
    isLoadingUserDetails ||
    isLoadingCountryDetails ||
    isBlogLoading ||
    isMyDataLoading ||
    isLoading
  )
    <LoadingIndicator />;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <Button
          onClick={() => navigate("/postblog")}
          variant="contained"
          sx={{ borderRadius: "30px" }}
        >
          + Create Blog Post
        </Button>
        {!isMyDataLoading && me && me.data.data && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              padding: "10px",
              gap: "8px",
            }}
          >
            <Button
              variant="contained"
              onClick={() => navigate("/")}
              sx={{ borderRadius: "30px" }}
            >
              Home
            </Button>
            <Button
              onClick={() => navigate(`/user/${me.data.data.id}`)}
              variant="contained"
              sx={{ borderRadius: "30px" }}
            >
              Profile
            </Button>
            {!isLoading && data?.data?.isAuthenticated ? (
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
        )}
      </Box>
      {!isBlogLoading && (
        <Typography
          textAlign="center"
          fontSize="17px"
          fontWeight={700}
          margin={"5px"}
        >
          {blog?.data.title}
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          border: 1,
          borderRadius: "5px",
          padding: "10px",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <Typography
            textAlign="center"
            sx={{
              backgroundColor: "cyan",
              borderRadius: "10px",
              padding: "5px",
            }}
          >
            User Detail
          </Typography>
          <Button
            onClick={() => navigate(`/user/${userDetails?.data.data.id}`)}
            sx={{ borderRadius: "10px" }}
            variant="outlined"
          >
            Navigate To User Profile
          </Button>
          <Typography>Name : {userDetails?.data.data.name}</Typography>
          <Typography>Email : {userDetails?.data.data.email}</Typography>
        </Box>
        {!isLoadingCountryDetails && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            <Typography
              textAlign="center"
              sx={{
                backgroundColor: "cyan",
                borderRadius: "10px",
                padding: "5px",
              }}
            >
              Country Detail
            </Typography>
            <Typography>{countryDetails?.data.name}</Typography>
            <Typography>{countryDetails?.data.capital}</Typography>
            <Typography>{countryDetails?.data.currency}</Typography>
            <img
              src={countryDetails?.data.flag}
              style={{ width: "40px", height: "20px" }}
            />
          </Box>
        )}
      </Box>
      <Box
        sx={{
          borderRadius: "10px",
          padding: "20px",
          border: 1,
          borderColor: "cyan",
        }}
      >
        {!isBlogLoading && <Typography>{blog?.data.content}</Typography>}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Button
          disabled={
            isLoadingLikeCount ||
            isLikeStateLoading ||
            likeState.data?.like == 1
          }
          onClick={() =>
            likeAndDislikeBlogFn(
              { id: Number(id), like: true },
              {
                onSuccess() {
                  toast.success("Blog Liked By You");
                  refetchLikeState();
                  refetchLikeCount();
                },
              }
            )
          }
          sx={{
            borderRadius: "30px",
            padding: "12px",
            display: "flex",
            gap: "10px",
          }}
          variant="contained"
        >
          {!isLoadingLikeCount && (
            <Typography>{likeCount.data.likes}</Typography>
          )}
          {"  "}
          Like
        </Button>

        <Button
          disabled={
            isLoadingLikeCount ||
            isLikeStateLoading ||
            likeState.data?.like == 0
          }
          onClick={() =>
            likeAndDislikeBlogFn(
              { id: Number(id), like: false },
              {
                onSuccess() {
                  toast.success("Blog Disliked By You");
                  refetchLikeState();
                  refetchLikeCount();
                },
              }
            )
          }
          sx={{
            borderRadius: "30px",
            padding: "12px",
            display: "flex",
            gap: "10px",
          }}
          variant="contained"
        >
          {!isLoadingLikeCount && (
            <Typography>{likeCount.data.dislikes} </Typography>
          )}
          Dislike
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <TextField
          label="Add Comment"
          sx={{ width: "90%" }}
          inputRef={commentField}
        >
          Add Comment
        </TextField>
        <Button
          onClick={() => handleSubmitComment()}
          disabled={isPendingAddingComment}
          variant="outlined"
        >
          Add Comment
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          borderRadius: "10px",
          backgroundColor: "wheat",
          padding: "10px",
        }}
      >
        {!isLoadingComments &&
          comments.data.map((comment: any) => {
            return (
              <Typography>
                {`==>  `}
                {comment.comment}
              </Typography>
            );
          })}
      </Box>
    </Box>
  );
}

export default BlogPost;
