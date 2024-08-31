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
                                    <TableCell align="center" style={{ color: "#00519b", fontSize: '25px' }}>
                                        <b>NUMERO</b>
                                    </TableCell >
                                    <TableCell align="center" style={{ color: "#00519b", fontSize: '25px' }}>
                                        <b>NOMBRE</b>
                                    </TableCell >
                                    <TableCell align="center" style={{ color: "#00519b", fontSize: '25px' }}>
                                        <b>ESTADO</b>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {pedidosFilter?.map((pedido) => (
                                    <TableRow
                                        key={pedido.numeroPedido}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                        <TableCell align="center" style={{ fontSize: '90px', fontFamily: 'Arial' }} >
                                            {pedido.numeroPedido}
                                        </TableCell>
                                        <TableCell align="center" style={{ fontSize: '90px', fontFamily: 'Arial' }} >
                                            {pedido.nombre}
                                        </TableCell>
                                        <TableCell align="center" style={{ fontSize: '90px', fontFamily: 'Arial' }}>
                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="center"
                                                alignItems="center"
                                                spacing={3.5}
                                            >
                                                <Grid item xs={2} xl={2}>
                                                    <Tooltip
                                                        title={pedido.estado === 'Generado' ? 'Generar pedido' : pedido.estado ? 'Preparar pedido' : 'Pedido Listo'}//"Generar pedido"
                                                        placement="top"
                                                        arrow
                                                        style={{ fontSize: '100px', fontFamily: 'Arial' }}
                                                    >
                                                        <div>

                                                            <Typography style={{ fontSize: '90px', fontFamily: 'Arial' }}>{pedido.estado}</Typography>
                                                        </div>

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