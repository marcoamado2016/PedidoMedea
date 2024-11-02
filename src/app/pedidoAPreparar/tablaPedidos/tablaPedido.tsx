'use client'
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography, TableCell, Grid, Tooltip, IconButton, Button } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import CheckIcon from '@mui/icons-material/Check';
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';
import React from "react";
import MiDialog2 from "@/app/MiDialog2/MiDialog2";
import { useRouter } from "next/navigation"
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { usePedidoFetch } from "@/hooks/usePedidoFetch";
import { PedidoServicio } from "@/app/api/apiPedidos/pedidos.api";

interface OpenDialog {
    open: boolean;
    title: string;
    message: string;
    action?: () => void;
}
export default function TablaPedidos(props: {
    datosTabla: any[];
    value?: number;
}) {
    const router = useRouter()
    const [dialogoExito, setDialogoExito] = React.useState<OpenDialog>({
        open: false,
        title: '',
        message: ''
    })
    const pedidosFilter = props.datosTabla.filter((p) => p.estado !== "Cancelado" && p.estado !== "Entregado")
    const cambiarEstadoPedido = async (numeroPedido: number, estado: string, nombre: string) => {
        let servicioCambiarPedido = new PedidoServicio();
        servicioCambiarPedido.cambiarEstadoListoPedidos(numeroPedido, estado, nombre)
            .then((ok) => {
                console.log("OKOKOK ", ok);
            })
            .catch((error) => console.log("ERROROR", error))
    }
    return (
        <>
            <div style={{ margin: "2em", paddingLeft: "1em", height: 'calc(100% - 4em)' }}>
                {pedidosFilter.length === 0 ? (
                    <Typography align="center" variant="h4" sx={{ color: "#CECCCC" }}>
                        No se encontraron resultados para la búsqueda realizada
                    </Typography>) : (
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 400 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" style={{ color: "#00519b" }}>
                                        <b>NUMERO PEDIDO</b>
                                    </TableCell >
                                    <TableCell align="center" style={{ color: "#00519b" }}>
                                        <b>NOMBRE</b>
                                    </TableCell >
                                    <TableCell align="center" style={{ color: "#00519b" }}>
                                        <b>CANTIDAD</b>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {pedidosFilter?.map((pedido) => (
                                    <TableRow
                                        key={pedido.numeroPedido}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                        <TableCell align="center" style={{ fontSize: '30px', fontFamily: 'Arial' }} >
                                            {pedido.numeroPedido}
                                        </TableCell>
                                        <TableCell align="center" style={{ fontSize: '30px', fontFamily: 'Arial' }}>
                                            {pedido.nombre}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="body1" fontFamily="Arial" fontSize="1.3rem" align="center">
                                                {pedido.hamburguesa != 0 ? pedido.detallehamburguesa ? pedido.hamburguesa + ' HAMBUR ' + pedido.detallehamburguesa + ' ' : pedido.hamburguesa + ' HAMBUR ' : ''}
                                                {pedido.pancho != 0 ? pedido.detallepancho ? pedido.pancho + ' PANCHO ' + pedido.detallepancho + ', ' : pedido.pancho + ' PANCHO ' : ''}
                                                {pedido.cono != 0 ? pedido.detallecono ? pedido.cono + ' CONO ' + pedido.detallecono + ', ' : pedido.cono + ' CONO ' : ''}
                                                {pedido.lomito != 0 ? pedido.detallelomo ? pedido.lomito + ' LOMOS ' + pedido.detallelomo + ' ' : pedido.lomito + ' LOMOS ' : ''}
                                                {pedido.pizza != 0 ? pedido.detallepizza ? pedido.pizza + ' PIZZAS ' + pedido.detallepizza + ', ' : pedido.pizza + ' PIZZAS ' : ''}
                                                {pedido.empanada != 0 ? pedido.detalleempanada ? pedido.empanada + ' EMP ' + pedido.detalleempanada + '' : pedido.empanada + ' EMP ' : ''}
                                            </Typography>

                                        </TableCell>
                                        <TableCell align="center">
                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="center"
                                                alignItems="center"
                                                spacing={3.5}
                                            >
                                                <Grid item xs={1} xl={1}>
                                                    <Tooltip
                                                        title="Listo"
                                                        placement="top"
                                                        arrow         
                                                    >
                                                        <IconButton
                                                          
                                                            onClick={() => {
                                                                cambiarEstadoPedido(pedido.numeroPedido, "Listo", pedido.nombre)
                                                            }}
                                                            style={{ color: pedido.estado === 'Listo' ? "#00ff00" : '',backgroundColor:"blue" }}
                                                        >
                                                            <CheckIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </TableContainer>

                )}
            </div>
            <MiDialog2
                open={dialogoExito.open}
                title={
                    dialogoExito.title
                }

                message={dialogoExito.message}
                actions={[
                    {
                        text: "Aceptar",
                        color: "primary",
                        variant: "contained",
                        onClick: () => {
                            setDialogoExito({
                                open: false,
                                title: "",
                                message: '',
                            })
                            window.location.reload();
                        },
                    },
                ]}
            />

        </>


    )
}