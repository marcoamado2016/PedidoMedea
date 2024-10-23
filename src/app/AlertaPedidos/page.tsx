'use client'

import { usePedidoGetFetch } from "@/hooks/usePedidosGetFetch";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Card, Grid, Typography } from "@mui/material";
import styles from "../bandejaPedidos/bandejaPedidos.module.css"
import ContenedorTabla from "./contenedorTabla/contenedorTabla";
import { PedidoServicio } from "../api/apiPedidos/pedidos.api";

export default function PedidoAPreparar() {
    const router = useRouter();
    const [value, setValue] = useState(0);
    const pedidoFetch = usePedidoGetFetch();
    const [datosTabla, setDatosTabla] = useState<any[]>([]);
    const [cargandoDatos, setCargandoDatos] = useState<boolean>(true);
    const [entregar, setEntregar] = useState<boolean>(false);
    useEffect(() => {
        const obtenerPedidosInterval = setInterval(() => {
            obtenerPedidos().then((o) => setEntregar(true)).catch((c) => console.log("33", c));
        }, 8000);
        return () => clearInterval(obtenerPedidosInterval);
    }, [value === 0,entregar===false]);

    useEffect(() => {
        const obtenerPedidosInterval = setInterval(() => {
            obtenerPedidos()
            .then((data: any[]) => {
                if (data.length > 0) {
                    let pedidoSeleccioando = data[data.length - 1];
                    cambiarEstadoPedido(pedidoSeleccioando = data[data.length - 1].numeroPedido, "Entregado", pedidoSeleccioando = data[data.length - 1].nombre)
                    setEntregar(false);
                }

            })
            .catch((error) => {
                throw new Error(`${error}`);
            })

        }, 60000);
        return () => clearInterval(obtenerPedidosInterval);

    }, [entregar === true])
    const obtenerPedidos = async () => {
        let queryParams: any = {
            numeroPedido: 0,
            estado: "Listo"
        };
        try {
            let respuesta = await pedidoFetch({
                endpoint: 'search',
                queryParams,
                options: {}
            });
            if (respuesta?.data.Pedido.length > 0) {
                setDatosTabla(respuesta?.data.Pedido);
                setCargandoDatos(true);
                setValue(0);
            } else {
                setCargandoDatos(true);
                setValue(1);
            }
            return respuesta?.data.Pedido;
        } catch (error) {
            console.error("error", error);
            setCargandoDatos(false);
            throw error;
        }
    };
    const cambiarEstadoPedido = async (numeroPedido: number, estado: string, nombre: string) => {
        let servicioCambiaPedido = new PedidoServicio();
        servicioCambiaPedido.cambiarEstadoListoPedidos(numeroPedido, estado, nombre)
            .then(() => {

            })
            .catch((error) => { throw new Error(`${error}`) })
    }
    return (
        <div style={{ margin: '2em', paddingLeft: '1em', width: '100vw', height: '100vh' }}>
            <Card>
                <div className={styles.divBar} color="red">Pedidos a retirar</div>
                {value === 1 ? (
                    <Typography align="center" variant="h4" sx={{ color: "#CECCCC" }}>
                        No se encontraron pedidos a retirar
                    </Typography>
                ) : (
                    <ContenedorTabla datosTabla={datosTabla} setCargandoDatos={setCargandoDatos} cargandoDatos={cargandoDatos} value={value} setValue={setValue} />
                )}
                <Grid
                    container
                    justifyContent="flex-end"
                    alignItems="center"
                    padding={"1em"}
                >
                    <Grid item>
                        <Button
                            variant="outlined"
                            style={{
                                backgroundColor: "white",
                                boxShadow: "1px 12px 16px -10px rgba(0,0,0.75,0.75)",
                            }}
                            onClick={() => {
                                router.push("/home");
                            }}
                            size="medium"
                        >
                            Volver
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
}
