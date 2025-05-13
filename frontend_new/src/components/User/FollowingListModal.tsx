import { Avatar, Box, Button, Modal, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function FollowingListModal({
  data,
  open,
  close,
}: {
  data: any;
  open: boolean;
  close: any;
}) {
  const navigate = useNavigate();
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
          minWidth: "40%",
          borderRadius: "20px",
          scrollBehavior: "auto",
          overflow: "auto",
          // opacity: "70%",
        }}
      >
        <Typography sx={{ padding: "10px", margin: "10px" }} textAlign="center">
          Following Users List
        </Typography>
        {data?.data?.following?.length > 0 ? (
          data?.data?.following?.map((followingUser: any) => {
            return (
              <Box
                sx={{
                  borderRadius: "20px",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background:
                    "linear-gradient(38deg, rgba(197, 195, 228, 0.975) 0%, #dadcb2 29%, #8adaee 93%)",
                }}
              >
                <Button
                  onClick={() => {
                    navigate(`/user/${followingUser.id}`);
                    close();
                  }}
                >
                  <Avatar>{followingUser.name.slice(0, 2)}</Avatar>
                </Button>
                <Typography>{followingUser.name}</Typography>
              </Box>
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
            <Typography textAlign="center">No Following Users Found</Typography>
          </Box>
        )}
      </Box>
    </Modal>
  );
}

export default FollowingListModal;
