import { Box, Button, Modal, Typography } from "@mui/material";

function DeleteModal({
  deleteFunction,
  open,
  close,
  id,
  refetch,
}: {
  deleteFunction: any;
  open: boolean;
  close: any;
  id: number | string;
  refetch?: any;
}) {
  return (
    <Modal
      open={open && id !== undefined}
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
        <Typography
          sx={{ padding: "10px", margin: "10px" }}
          textAlign="center"
          fontWeight={700}
          fontSize="18px"
        >
          Are You Sure You Want to Delete ?
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "10px",
            gap: "10px",
          }}
        >
          <Button
            variant="contained"
            color="warning"
            onClick={() =>
              deleteFunction(
                { id: Number(id) },
                {
                  onSuccess() {
                    refetch();
                    close();
                  },
                }
              )
            }
          >
            Yes Sure
          </Button>
          <Button variant="contained" onClick={() => close()}>
            {" "}
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default DeleteModal;
