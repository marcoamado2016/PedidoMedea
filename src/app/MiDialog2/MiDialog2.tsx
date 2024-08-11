//Import react
import React from "react";

//Material-ui
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
//Icon
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import WarningIcon from "@mui/icons-material/Warning";
import LoginPage from "../registrarPedidos/page";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width:"30%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "40px",
  boxShadow: 24,
  p: 4,
};

function MiDialog2(props: any) {
  const {
    title = "",
    actions = [],
    message = "",
    open = false,
    autoClose = false,
    loading = false,
    closeOnLoading = false,
    typeMessage = {},
    onClose = () => {},
  } = props;

  function _onClose() {
    if (autoClose === false) return;
    if (loading === true && closeOnLoading === false) return;
    onClose();
  }

  return (
    <Modal open={open} onClose={_onClose}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={style}
      >
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            {typeMessage === "check" && (
              <CheckCircleIcon sx={{ fontSize: 80, color: "#B2B1FF" }} />
            )}
            {typeMessage === "error" && (
              <SentimentVeryDissatisfiedIcon
                sx={{ fontSize: 80, color: "#8FD4F1" }}
              />
            )}
            {typeMessage === "alert" && <WarningIcon sx={{ fontSize: 80 }} />}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          {title && title.trim() !== "" && (
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: "center" }}>
              {title.trim()}
            </Typography>
          )}
        </Grid>
        {message !== "" && (
          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: "center" }}>
                {message}
              </Typography>
            </Grid>
          </Grid>
        )}

        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ paddingTop: "2vh" }}
            spacing={2}
          >
            {actions.map((action: any, actionIndex: number) => {
              if (action.autoFocus === undefined) action.autoFocus = false;
              if (action.text === undefined) action.text = "";
              if (action.autoClose === undefined) action.autoClose = true;
              if (action.onClick === undefined) action.onClick = () => {};
              return (
                <Button
                  key={actionIndex}
                  autoFocus={action.autoFocus}
                  variant={action.variant}
                  color={action.color}
                  sx={{ margin: "0.5vw" }}
                  onClick={() => {
                    if (action.autoClose === true) onClose();
                    action.onClick();
                  }}
                >
                  {action.text}
                </Button>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
}

export default MiDialog2;
