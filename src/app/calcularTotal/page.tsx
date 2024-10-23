
'use client'
import { Form } from "@/components/Form";
import { useProductoPrecioFetch } from "@/hooks/useProductoPrecio";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import MiDialog2 from "../MiDialog2/MiDialog2";
import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation"
import { usePedidoGetFetch } from "@/hooks/usePedidosGetFetch";
import { PedidoServicio } from "../api/apiPedidos/pedidos.api";
interface OpenDialog {
    open: boolean;
    title: string;
    message: string;
    action?: () => void;
}
const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Mes de 0 a 11
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
export default function TotalVendido() {
    let router = useRouter();
    const pedidoFetch = usePedidoGetFetch();
    const [pedidos, setPedidos] = useState<any[]>([]);
    const [dialogoExito, setDialogoExito] = React.useState<OpenDialog>({
        open: false,
        title: '',
        message: ''
    })
    const [formValues, setFormValues] = useState({
        fechaVenta: getCurrentDate(),
        totalHamburguesa: '',
        totalpizza: '',
        totalempanada: '',
        totalcono: '',
        totallomito: '',
        total: '',
        totalpancho: ''

    })
    const obtenerPedios = async (): Promise<any> => {
    }
    useEffect(() => {
       
       let pedidos = new PedidoServicio();
          pedidos.allPedidos()
            .then((response) => {
                if(response.pedidos.length > 0){

                    setPedidos(response.pedidos)
                }
            })
            .catch((error) => console.log("ERROR", error))
    }, [])

    useEffect(() => {
        actualizarVenta();
    }, [pedidos.length > 0])
    const setDefaultValues = () => {
        setFormValues({
            fechaVenta: getCurrentDate(),
            totalHamburguesa: '',
            totalpizza: '',
            totalempanada: '',
            totalcono: '',
            totallomito: '',
            total: '',
            totalpancho: ''
        })
    }
    const actualizarVenta=()=>{
        let total: any = {};
        total = {
            empanada: 0,
            hamburguesa: 0,
            lomito: 0,
            pizza: 0,
            pancho: 0,
            preciohamburguesa: 0.0,
            preciolomito: 0,
            preciopancho: 0,
            preciopizza: 0.0,
            precioempanada: 0,
            total: 0
        }
        if (pedidos.length > 0) {
            for (const p of pedidos) {
                console.log("P ",p)
                if (p.estado === "Entregado") {
                    total['empanada'] = total['empanada'] + p.empanada || 0;
                    total['hamburguesa'] = total['hamburguesa'] + p.hamburguesa || 0;
                    total['lomito'] = total['lomito'] + p.lomito || 0;
                    total['pizza'] = total['pizza'] + p.pizza || 0;
                    total['pancho'] = total['pancho'] + p.pancho || 0;
                    total['cono'] = total['cono'] + p.cono || 0;
                    total['preciohamburguesa'] = !(isNaN(p.preciohamburguesa)) && p.preciohamburguesa ? total['preciohamburguesa'] + parseFloat(p.preciohamburguesa) : total['preciohamburguesa'] + 0.0;
                    total['preciolomito'] = !(isNaN(p.preciolomito)) && p.preciolomito ? total['preciolomito'] + parseFloat(p.preciolomito) : total['preciolomito'] + 0.0;
                    total['preciopancho'] = !(isNaN(p.preciopancho)) && p.preciopancho ? total['preciopancho'] + parseFloat(p.preciopancho) : total['preciopancho'] + 0.0;
                    total['preciopizza'] = !(isNaN(p.preciopizza)) && p.preciopizza ? total['preciopizza'] + parseFloat(p.preciopizza) : total['preciopizza'] + 0.0;
                    total['precioempanada'] = !(isNaN(p.precioempanada)) && p.precioempanada ? total['precioempanada'] + parseFloat(p.precioempanada) : total['precioempanada'] + 0.0;
                    total['total'] = !(isNaN(p.total)) && p.total ? total['total'] + parseFloat(p.total) : total['total'] + 0.0;
                }
            }
            setFormValues({
                total: total['total'] || '0',
                fechaVenta: getCurrentDate(),
                totalcono: total['cono'] || '0',
                totalempanada: total['empanada'] || '0',
                totalHamburguesa: total['hamburguesa'] || '0',
                totallomito: total['lomito'] || '0',
                totalpancho: total['pancho'] || '0',
                totalpizza: total['pizza'] || '0'
            })
        }
    }
    const generaPdf = async (formData: any) => {
        try {
           actualizarVenta();
        } catch (error) {
            console.log("Error en el frontend ", error)
        }
    }
    return (
        <>
            <Grid container style={{ backgroundColor: '#419df3' }}>
                <Form
                    title={'ventas realizadas'}
                    descripcion={'Por cantidad'}
                    onSubmit={generaPdf}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} >
                            <Form.Input
                                label='Fecha Venta'
                                name='fechaVenta'
                                placeholder="Fecha de Venta"
                                type="date"
                                disable={true}
                                defaultValue={formValues.fechaVenta}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} >
                            <Form.Input
                                label="Cantidad Hamburguesa"
                                name="totalhamburguesa"
                                type="number"
                                placeholder="Total Hamburguesa"
                                disable={true}
                                defaultValue={formValues.totalHamburguesa}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} >
                            <Form.Input
                                label="Cantidad Pizza"
                                name="totalpizza"
                                type="number"
                                placeholder="Total Pizza"
                                disable={true}
                                defaultValue={formValues.totalpizza}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} >
                            <Form.Input
                                label="Cantidad empanadas"
                                name="totalempanada"
                                type="number"
                                placeholder="Total empanadas"
                                disable={true}
                                defaultValue={formValues.totalempanada}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} >
                            <Form.Input
                                label="Cantidad conos"
                                name="totalcono"
                                type="number"
                                placeholder="Total conos"
                                disable={true}
                                defaultValue={formValues.totalcono}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} >
                            <Form.Input
                                label="Cantidad Lomitos"
                                name="totallomito"
                                type="number"
                                placeholder="Total Lomitos"
                                disable={true}
                                defaultValue={formValues.totallomito}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} >
                            <Form.Input
                                label="Cantidad Pancho"
                                name="totalpancho"
                                type="number"
                                placeholder="Total Panchos"
                                disable={true}
                                defaultValue={formValues.totalpancho}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} >
                            <Form.Input
                                label=" $ Total Ganancia"
                                name="total"
                                type="number"
                                placeholder=" $ Total Ganancia"
                                disable={true}
                                defaultValue={formValues.total}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={6} container justifyContent="flex-start">
                            <Button
                                variant="outlined"
                                style={{
                                    backgroundColor: "black",
                                    color: "white",
                                    borderRadius: "8px",
                                    width: "60px",
                                    boxShadow: "1px 11px 16px -10px rgba(0,0,0.75,0.75)",
                                }}
                                onClick={() => {
                                    router.push("/home")
                                }}
                            >
                                Volver
                            </Button>
                        </Grid>
                        <Grid item xs={6} container justifyContent="flex-end">
                            <Form.SubmitButton
                                buttonText="descargar PDF"
                            />
                        </Grid>
                    </Grid>

                </Form>
            </Grid>
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
        </>)
}