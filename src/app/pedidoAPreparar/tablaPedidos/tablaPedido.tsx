'use client'
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography, TableCell, Grid, Tooltip, IconButton } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import CheckIcon from '@mui/icons-material/Check';
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';
import React from "react";
import MiDialog2 from "@/app/MiDialog2/MiDialog2";
import { useRouter } from "next/navigation"
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

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
                                            <Typography  variant="body1" fontFamily="Arial" fontSize="1.2rem" align="right">
                                            {pedido.pizza != 0 ? pedido.pizza + ' PIZZAS, ' : ''}
                                            {pedido.empanada != 0 ? pedido.empanada + ' EMPANADAS,' : ''}
                                            {pedido.cono != 0 ? pedido.cono + ' CONOS DE PAPAS ' : ''}
                                            {pedido.lomito != 0 ? pedido.lomito + ' LOMITOS ' : ''}
                                            {pedido.hamburguesa != 0 ? pedido.hamburguesa + ' HAMBURGESAS ' : ''}
                                            </Typography>

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