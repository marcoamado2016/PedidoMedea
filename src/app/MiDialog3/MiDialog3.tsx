import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import WarningIcon from "@mui/icons-material/Warning";
import LoginPage from "../registrarPedidos/page";
interface PedidoSeleccionado { numeroPedido: number; estado: string; detalle: string; fechaPedido: string }
const style = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    bgcolor: "background.paper",
    border: "none",
    outline: "none",
};

function MiDialog3(props: any) {
    const {
        title = "",
        actions = [],
        message = "",
        open = false,
        autoClose = false,
        loading = false,
        closeOnLoading = false,
        typeMessage = {},
        onClose = () => { },
        pedido = {} as PedidoSeleccionado,
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

                <Grid item>

                    <LoginPage pedido={pedido} />

                </Grid>
                <Grid item xs={12}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ paddingTop: "2vh" }}
                        spacing={2}
                    >
                        {actions.map((action: any, actionIndex: any) => {
                            if (action.autoFocus === undefined) action.autoFocus = false;
                            if (action.text === undefined) action.text = "";
                            if (action.autoClose === undefined) action.autoClose = true;
                            if (action.onClick === undefined) action.onClick = () => { };
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

export default MiDialog3;