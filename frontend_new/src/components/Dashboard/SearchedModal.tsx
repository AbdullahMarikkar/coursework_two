import { Box, Modal, Typography } from "@mui/material";

import BlogCard from "./BlogCard";

function SearchedModal({
  data,
  open,
  close,
}: {
  data: any;
  open: boolean;
  close: any;
}) {
  return (
    <Modal
      open={open && data !== undefined}
      onClose={close}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          background:
            "linear-gradient(38deg, rgba(2,0,36,0.9747548677674195) 0%, #dadcb2 29%, #8adaee 93%)",
          maxWidth: "80%",
          maxHeight: "80%",
          minWidth: "60%",
          borderRadius: "20px",
          scrollBehavior: "auto",
          overflow: "auto",
          // opacity: "70%",
        }}
      >
        <Typography sx={{ padding: "10px", margin: "10px" }} textAlign="center">
          Searched Blog Posts
        </Typography>
        {data?.data?.length > 0 ? (
          data?.data?.map((blog: any) => {
            return (
              <BlogCard
                userProfile={blog.name}
                blogDetails={blog}
                title={blog.title}
                countryFlag={blog.country}
                description={blog.content}
                deletable={false}
              />
            );
          })
        ) : (
          <Box
            sx={{
              minWidth: "60%",
              minHeight: "100px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography textAlign="center">No Blogs Found</Typography>
          </Box>
        )}
      </Box>
    </Modal>
  );
}

export default SearchedModal;
