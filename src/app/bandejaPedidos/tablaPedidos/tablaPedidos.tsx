'use client'
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography, TableCell, Grid, Tooltip, IconButton } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import CheckIcon from '@mui/icons-material/Check';
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { usePedidoFetch } from "@/hooks/usePedidoFetch";
import { SetStateAction, useState, Dispatch, useEffect } from "react";
import React from "react";
import MiDialog2 from "@/app/MiDialog2/MiDialog2";
import { useRouter } from "next/navigation"
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import MiDialog3 from "@/app/MiDialog3/MiDialog3";
import Paginacion from "@/app/paginacion/paginacion";

interface OpenDialog {
    open: boolean;
    title: string;
    message: string;
    action?: () => void;
}

interface PedisoSelccionado { numeroPedido: number; estado: string; detalle: string; fechaPedido: string, nombre: string, empanada: string, pizza: string, lomito: string, cono: string, hamburguesa: string }

export default function TablaPedidos(props: {
    datosTabla: any[];
    value?: number;
    filasPaginado: number;
    setfilasPaginado: Dispatch<SetStateAction<number>>;
    numeroPaginado: number;
    setNumeroPaginado: Dispatch<SetStateAction<number>>
    paginaSeleccionada: number;
    estado: string,
    setEstado: Dispatch<SetStateAction<string>>;
    setPaginaSeleccionada: Dispatch<SetStateAction<number>>;
    nombreCliente: string;
    setNombreCliente: Dispatch<SetStateAction<string>>;
}) {
    const [forceUpdate, setForceUpdate] = useState(false);
    const pedidioRouter = usePedidoFetch();
    const router = useRouter()
    const [dialogoExito, setDialogoExito] = React.useState<OpenDialog>({
        open: false,
        title: '',
        message: ''
    })
    const [dialogoExito1, setDialogoExitso1] = React.useState<OpenDialog>({
        open: false,
        title: '',
        message: ''
    })
    const [estados, seEstados] = React.useState<string[]>(
        ["Generado", "Preparar", "Listo", "Entregado"]
    )
    const [pedidoSeleccionado, setPedidoSeleccionado] = React.useState<PedisoSelccionado>({
        numeroPedido: 0, estado: "", detalle: "", fechaPedido: "", nombre: "", empanada: "", pizza: "", lomito: "", cono: "", hamburguesa: ""
    })

    const cambiarEstadoPedido = async (numeroPedido: number, estado: string, nombre: string) => {
        try {
            const pedidoCambiado = await pedidioRouter({
                endpoint: 'change-pedido',
                formData: { numeroPedido, estado, nombre }

            })

            if (estado === "Preparar") {
                setDialogoExito({
                    open: true,
                    title: "Pedido",
                    message: ' Preparar pedido con exito',
                })
            }
            if (estado === "Cancelado") {
                setDialogoExito({
                    open: true,
                    title: "Pedido",
                    message: 'Cancelado con exito',
                })
            }
            if (estado === "Entregado") {
                setDialogoExito({
                    open: true,
                    title: "Pedido",
                    message: 'Entregado con exito',
                })
            }
            if (estado === "Listo") {
                setDialogoExito({
                    open: true,
                    title: "Pedido",
                    message: 'Pedido Listo',
                })
            }

            setForceUpdate(prevState => !prevState);
        } catch (error) {
            console.error("error", error)
            throw error;
        }

    }
    const mostrarpedidoSeleccionado = async (pedido: { numeroPedido: number, estado: string, detalle: string, fechaPedido: string, nombre: string, empanada: string, pizza: string, lomito: string, cono: string, hamburguesa: string }) => {

        setPedidoSeleccionado(pedido);

        if (pedidoSeleccionado.numeroPedido !== 0 || pedidoSeleccionado.nombre != "") {
            setDialogoExitso1({
                open: true,
                title: "Pedido",
                message: 'Pedido generado con exito',
            })
        }

    }
    return (
        <>
            <div style={{ margin: "2em", paddingLeft: "1em" }}>
                {props.datosTabla.length === 0 ? (
                    <Typography align="center" variant="h4" sx={{ color: "#CECCCC" }}>
                        No se encontraron resultados para la búsqueda realizada
                    </Typography>) : (
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 1000 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" style={{ color: "#00519b" }}>
                                        <b>NRO</b>
                                    </TableCell >
                                    <TableCell align="center" style={{ color: "#00519b" }}>
                                        <b>NOMBRE</b>
                                    </TableCell>
                                    <TableCell align="center" style={{ color: "#00519b" }}>
                                        <b>ESTADO</b>
                                    </TableCell>
                                    <TableCell align="center" style={{ color: "#00519b" }}>
                                        <b>DETALLE</b>
                                    </TableCell>
                                    <TableCell align="center" style={{ color: "#00519b" }}>
                                        <b>ACCIONES</b>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {props.datosTabla?.map((pedido) => {
                                    return (
                                        <TableRow
                                            key={pedido.numeroPedido}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                            <TableCell align="center">
                                                <Typography variant="body1" fontFamily="Arial" fontSize="1.2rem" align="center">
                                                    {pedido.numeroPedido}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography variant="body1" fontFamily="Arial" fontSize="1.2rem" align="center">
                                                    {pedido.nombre}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography variant="body1" fontFamily="Arial" fontSize="1.2rem" align="center">
                                                    {pedido.estado}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography variant="body1" fontFamily="Arial" fontSize="1.2rem" align="center">
                                                    {pedido.pizza != 0 ? pedido.detallepizza ? pedido.pizza + ' PIZZAS ' + pedido.detallepizza + ', ' : pedido.pizza + ' PIZZAS' : ''}
                                                    {pedido.empanada != 0 ? pedido.detalleempanada ? pedido.empanada + ' EMP ' + pedido.detalleempanada + '' : pedido.empanada + ' EMP' : ''}
                                                </Typography>
                                                <Typography variant="body1" fontFamily="Arial" fontSize="1.2rem" align="center">
                                                    {pedido.cono != 0 ? pedido.detallecono ? pedido.cono + ' CONO ' + pedido.detallecono + ', ' : pedido.cono + ' CONO' : ''}
                                                    {pedido.lomito != 0 ? pedido.detallelomo ? pedido.lomito + ' LOMOS ' + pedido.detallelomo + ' ' : pedido.lomito + ' LOMOS' : ''}
                                                </Typography>
                                                <Typography variant="body1" fontFamily="Arial" fontSize="1.2rem" align="center">
                                                    {pedido.hamburguesa != 0 ? pedido.detallehamburguesa ? pedido.hamburguesa + ' HAMBUR ' + pedido.detallehamburguesa + ' ' : pedido.hamburguesa + ' HAMBUR' : ''}
                                                    {pedido.pancho != 0 ? pedido.detallepancho ? pedido.pancho + ' PANCHO ' + pedido.detallepancho + ', ' : pedido.pancho + ' PANCHO' : ''}
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
                                                            title="ver detalle"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <IconButton
                                                                onClick={async () => {

                                                                    await mostrarpedidoSeleccionado(pedido)
                                                                }}
                                                                disabled={false}
                                                            >
                                                                <VisibilityOutlinedIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Grid>
                                                    <Grid item xs={1} xl={1}>
                                                        <Tooltip
                                                            title="Pedidos a preparar"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <IconButton
                                                                onClick={() => {
                                                                    let estado = "Preparar";
                                                                    cambiarEstadoPedido(pedido.numeroPedido, estado, pedido.nombre)
                                                                }}
                                                                style={{ color: pedido.estado === 'Preparar' ? "#00ff00" : '' }}
                                                                disabled={false}
                                                            >
                                                                <HourglassBottomOutlinedIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Grid>
                                                    <Grid item xs={1} xl={1}>
                                                        <Tooltip
                                                            title="Pedidos a retirar"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <IconButton
                                                                onClick={() => {
                                                                    let estado = "Listo";
                                                                    cambiarEstadoPedido(pedido.numeroPedido, estado, pedido.nombre)
                                                                }}
                                                                style={{ color: pedido.estado === 'Listo' ? "#00ff00" : '' }}
                                                                disabled={false}
                                                            >
                                                                <CheckIcon />
                                                            </IconButton>

                                                        </Tooltip>
                                                    </Grid>
                                                    <Grid item xs={1} xl={1}>
                                                        <Tooltip
                                                            title="Pedido entregado"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <IconButton
                                                                onClick={() => {
                                                                    let estado = "Entregado";
                                                                    cambiarEstadoPedido(pedido.numeroPedido, estado, pedido.nombre)
                                                                }}
                                                                style={{ color: pedido.estado === 'Entregado' ? "#00ff00" : '' }}
                                                                disabled={false}
                                                            >
                                                                <DeliveryDiningIcon />
                                                            </IconButton>

                                                        </Tooltip>
                                                    </Grid>
                                                    <Grid item xs={1} xl={1}>
                                                        <Tooltip
                                                            title="Editar pedido"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <IconButton
                                                                onClick={async () => {

                                                                    await mostrarpedidoSeleccionado(pedido)
                                                                }}
                                                                disabled={true}
                                                            >
                                                                <EditIcon />
                                                            </IconButton>

                                                        </Tooltip>
                                                    </Grid>
                                                    <Grid item xs={1} xl={2}>
                                                        <Tooltip
                                                            title="Cancelar pedido"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <IconButton
                                                                onClick={() => {
                                                                    let estado = "Cancelado";
                                                                    cambiarEstadoPedido(pedido.numeroPedido, estado, pedido.nombre)
                                                                }}
                                                                style={{ color: pedido.estado === 'Cancelado' ? "#ff0000" : '' }}
                                                                disabled={false}
                                                            >
                                                                <CancelIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}

                            </TableBody>
                        </Table>
                    </TableContainer>

                )}
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{
                        backgroundColor: "#DBE7F3",
                        marginTop: "4vh",
                        height: "7vh",
                        borderRadius: "15px",
                    }}
                    columnSpacing={1}
                >
                    <Grid item xs={6} sx={{ marginTop: "-1rem" }}>
                        <Paginacion
                            cantidadFilasPorPagina={props.filasPaginado} //La cantidad de item
                            cantidadPaginas={props.numeroPaginado} //La cantidad de paginas
                            paginaSeleccionada={props.paginaSeleccionada} //la pagina seleccionada
                            setCantidadFilasPorPagina={props.setfilasPaginado} //El seteo de la cantidad de items
                            setPaginaSeleccionada={props.setPaginaSeleccionada} //El seteo de la pagina seleccionada
                        />
                    </Grid>

                </Grid>
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
            <MiDialog3
                open={dialogoExito1.open}
                title={
                    dialogoExito1.title
                }

                message={dialogoExito.message}
                actions={[
                    {
                        text: "",
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
                pedido={pedidoSeleccionado}
            />


        </>


    )
}