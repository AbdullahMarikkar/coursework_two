import { Avatar, Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import { useDeleteBlogPost } from "../../Services/ReactQueryFiles/useDeleteBlogPost";

function BlogCard({
  userProfile,
  blogDetails,
  title,
  countryFlag,
  description,
  likeCount,
  deletable,
  refetch,
}: {
  userProfile: string;
  blogDetails: any;
  title: string;
  countryFlag: string;
  description: string;
  likeCount?: number;
  deletable: boolean;
  refetch?: any;
}) {
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { deleteBlogFn } = useDeleteBlogPost();
  function openConfirmDeleteModal() {
    setOpenDeleteModal(true);
  }

  function closeModal() {
    setOpenDeleteModal(false);
  }
  return (
    <Box
      about="Blog Card"
      sx={{
        border: 1,
        borderRadius: "10px",
        padding: "5px",
        backgroundColor: "rgb(188, 223, 230)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "10px",
          marginBottom: "5px",
        }}
      >
        <Button
          onClick={() => navigate(`/user/${blogDetails.user_id}`)}
          sx={{
            display: "flex",
            gap: "10px",
            backgroundColor: "rgb(129, 187, 199)",
            borderRadius: "10px",
          }}
        >
          <Avatar alt={userProfile} sx={{ backgroundColor: "cyan" }}>
            {userProfile.slice(0, 2)}
          </Avatar>
          <Typography>{userProfile}</Typography>
        </Button>
        <Typography fontWeight={700} color="rgb(40, 87, 96)">
          {title.toUpperCase()}
        </Typography>
        <Typography
          sx={{
            backgroundColor: "rgb(143, 221, 237)",
            borderRadius: "10px",
            padding: "10px",
          }}
          fontWeight={700}
        >
          {countryFlag}
        </Typography>
      </Box>
      <Typography sx={{ marginBottom: "5px" }}>{`${description.slice(
        0,
        200
      )}....`}</Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {likeCount !== undefined && (
          <Typography
            sx={{
              backgroundColor: "rgb(143, 221, 237)",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            {likeCount} Users Have Liked this Post
          </Typography>
        )}
        {deletable && (
          <Button
            variant="contained"
            color="warning"
            onClick={() => openConfirmDeleteModal()}
          >
            Delete
          </Button>
        )}
        <Button
          onClick={() =>
            navigate(
              `/blog/${blogDetails.id}?c=${countryFlag}&u=${blogDetails.user_id}`
            )
          }
          sx={{
            backgroundColor: "gold",
            borderRadius: "10px",
            color: "rgb(89, 90, 8)",
          }}
        >
          {"Check this Post ->"}
        </Button>
      </Box>
      <DeleteModal
        open={openDeleteModal}
        close={closeModal}
        deleteFunction={deleteBlogFn}
        id={blogDetails.id}
        refetch={refetch}
      />
    </Box>
  );
}

export default BlogCard;
