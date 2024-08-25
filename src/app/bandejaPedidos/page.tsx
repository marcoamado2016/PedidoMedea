'use client'

import { Button, Card, Grid } from "@mui/material";
import styles from "./bandejaPedidos.module.css"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import FiltroPedidos from "./filtroPedidos/filtrosPedidos";
import { usePedidoGetFetch } from "@/hooks/usePedidosGetFetch";
import ContenedorTabla from "./contenedorTabla/contenedorTabla";
export default function BandejaPedidos() {
    const router = useRouter()
    const [numeroPedido, setNumeroPedido] = useState<number>(0);
    const [estado, setEstado] = useState<string>("");
    const [value, setValue] = useState(0);
    const pedidoFetch = usePedidoGetFetch()
    const [datosTabla, setDatosTabla] = useState<any[]>([])
    const [cargandoDatos, setCargandoDatos] = useState<boolean>(false);
    const [filasPaginado, setfilasPaginado] = useState<number>(15);
    const [numeroPaginado, setNumeroPaginado] = useState<number>(1);
    const [paginaSeleccionada, setPaginaSeleccionada] = useState(1);
    const [cantidadTotalRegistros, setCantidadTotalRegistros] = useState<number>(0);
    const [nombreCliente, setNombreCliente] = useState<string>("");
    useEffect(() => {
        obtenerPedidos(value, estado, nombreCliente)
    }, [value, paginaSeleccionada, filasPaginado])

    const obtenerPedidos = async (value: number, estado: string, nombreCliente: string) => {
        setCargandoDatos(true);
        let queryParams: any = {}
        queryParams = {
            filasPaginado: filasPaginado,
            numeroPagina: paginaSeleccionada
        }
        if (nombreCliente?.length !== 0) {
            queryParams = {
                ...queryParams,
                nombreCliente: nombreCliente
            }

        } else {
            if (estado.length === 0) {
                queryParams = {
                    numeroPedido: value,
                    ...queryParams
                }
            }
            if (estado.length !== 0) {
                queryParams = {
                    numeroPedido: value,
                    estado: estado,
                    ...queryParams
                }
            }
        }

        try {
            const respuesta = await pedidoFetch({
                endpoint: 'search',
                queryParams,
                options: {}
            })
            if (respuesta) {
                setDatosTabla(respuesta.data.Pedido)
                setCargandoDatos(false)
            }
        } catch (error) {
            console.error("error", error)
            setCargandoDatos(false);
            throw error;
        }
    }
    return (
        <div style={{ margin: '1em', paddingLeft: '1em' }}>
            <Card>
                <div className={styles.divBar}>Bandeja de pedidos</div>
                <FiltroPedidos
                    setNumeroPedido={setNumeroPedido}
                    numeroPedido={numeroPedido}
                    obtenerPedidos={obtenerPedidos}
                    value={value}
                    estado={estado}
                    setEstado={setEstado}
                    nombreCliente={nombreCliente}
                    setNombreCliente={setNombreCliente}
                />
                <ContenedorTabla datosTabla={datosTabla} setCargandoDatos={setCargandoDatos} cargandoDatos={cargandoDatos} value={value} setValue={setValue} filasPaginado={filasPaginado} setfilasPaginado={setfilasPaginado} numeroPaginado={numeroPaginado} setNumeroPaginado={setNumeroPaginado} paginaSeleccionada={paginaSeleccionada} setPaginaSeleccionada={setPaginaSeleccionada} estado={estado} setEstado={setEstado} nombreCliente={nombreCliente} setNombreCliente={setNombreCliente} />
                <Grid
                    container
                    justifyContent="flex-end"
                    alignItems="center"
                    padding={"1em"}
                >
                    <Grid item xs={1.1}>

                        <Button
                            variant="outlined"
                            style={{
                                backgroundColor: "white",
                                boxShadow: "1px 11px 16px -10px rgba(0,0,0.75,0.75)",
                            }}
                            onClick={() => {
                                router.push("/home")
                            }}
                            size="medium"
                        >
                            Volver
                        </Button>
                    </Grid>
                </Grid>

            </Card>

        </div>
    )
}