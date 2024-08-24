
'use client'
import { Form } from "@/components/Form"
import { useLoading } from "@/hooks/useLoading"
import { usePedidoFetch } from "@/hooks/usePedidoFetch"
import { useEffect, useState } from "react"
import React from "react";
import MiDialog2 from "../MiDialog2/MiDialog2"
import { Grid } from "@mui/material"
import { Button } from "react-bootstrap"
import { useRouter } from "next/navigation"
import { PedidoServicio } from "./siguieneNumeo"

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
export default function LoginPage(pedido?: any) {
    let router = useRouter();
    const { finishLoading, isLoading, startLoading } = useLoading()
    const pedidoFetch = usePedidoFetch();
    const [formValues, setFormValues] = useState({
        numeroPedido: '',
        fechaPedido: getCurrentDate(),
        detalle: '',
        nombre: '',
        empanada: '',
        pizza: '',
        lomito: '',
        cono: '',
        hamburguesa: '',
        pancho: '',
        detalleempanada: '',
        detallepizza: '',
        detallelomo: '',
        detallecono: '',
        detallehamburguesa: '',
        detallepancho: '',
        precioempanada: '',
        preciopizza: '',
        preciolomito: '',
        preciocono: '',
        preciohamburguesa: '',
        preciopancho: ''
    })
    useEffect(() => {
        let siguienteNumero = new PedidoServicio();
        siguienteNumero.obtenerSiguienteNumeroPedido()
            .then((data) => {
                setFormValues(prevValue => (
                    {
                        ...prevValue,
                        numeroPedido: data.numeroSiguiente.toString()
                    }
                ))
            })
            .catch((error) => console.log(error));
    }, []);
    useEffect(() => {
        if (pedido?.pedido) {
            setFormValues({
                numeroPedido: pedido?.pedido?.numeroPedido,
                fechaPedido: pedido?.pedido?.fechaPedido,
                detalle: pedido?.pedido?.detalle,
                nombre: pedido?.pedido?.nombre,
                empanada: pedido?.pedido?.empanada,
                pizza: pedido?.pedido?.pizza,
                lomito: pedido?.pedido?.lomito,
                cono: pedido?.pedido?.cono,
                hamburguesa: pedido?.pedido?.hamburguesa,
                pancho: pedido?.pedido?.pancho,
                detalleempanada: pedido?.pedido?.detalleempanada,
                detallepizza: pedido?.pedido?.detallepizza,
                detallelomo: pedido?.pedido?.detallelomo,
                detallecono: pedido?.pedido?.detallecono,
                detallehamburguesa: pedido?.pedido?.detallehamburguesa,
                detallepancho: pedido?.pedido?.detallepancho,
                precioempanada: '',
                preciopizza: '',
                preciolomito: '',
                preciocono: '',
                preciohamburguesa: '',
                preciopancho: ''
            });
        }
    }, [pedido])

    const [dialogoExito, setDialogoExito] = React.useState<OpenDialog>({
        open: false,
        title: '',
        message: ''
    })
    const setDefaultValues = () => {
        setFormValues({
            detalle: '',
            fechaPedido: '',
            numeroPedido: '',
            nombre: '',
            empanada: '',
            pizza: '',
            lomito: '',
            cono: '',
            hamburguesa: '',
            pancho: '',
            detalleempanada: '',
            detallepizza: '',
            detallelomo: '',
            detallecono: '',
            detallehamburguesa: '',
            detallepancho: '',
            precioempanada: '',
            preciopizza: '',
            preciolomito: '',
            preciocono: '',
            preciohamburguesa: '',
            preciopancho: ''
        });
    }

    const registrarPedido = async (formData: any) => {

        try {

            if (pedido?.pedido || pedido.nombre) {
                startLoading()
                const pedidoCambiado = await pedidoFetch({
                    endpoint: 'change-pedido',
                    formData: formData
                })
                if (pedidoCambiado.status == 200) {
                    setDialogoExito({
                        open: true,
                        title: "Pedido modificado ",
                        message: 'Exito',
                    })
                }
                finishLoading();
                setDefaultValues();
            } else {
                startLoading()
                formData.estado = 'Preparar'
                const respuesta = await pedidoFetch({
                    endpoint: 'save',
                    redirectRoute: '/registrarPedidos',
                    formData
                })

                finishLoading();
                setDefaultValues();
                if (respuesta.status == 200) {
                    setDialogoExito({
                        open: true,
                        title: "Registro de pedido",
                        message: 'Exito',
                    })

                }

            }


        } catch (error: any) {
            console.error("Error al registrar el pedido ", error)
            if (error?.response?.status === 409) {
                setDialogoExito({
                    open: true,
                    title: "Pedido",
                    message: 'El pedido ya se registro',
                })

            }
            if (error?.response?.status === 400) {
                setDialogoExito({
                    open: true,
                    title: "No se puede registrar el pedido",
                    message: 'Debe ingresar la cantidad de algun producto.',
                })

            }
            if (error?.response?.status === 401) {
                setDialogoExito({
                    open: true,
                    title: "No se puede registrar el pedido",
                    message: 'Debe ingresar el nombre o número del pedido.',
                })

            }
            if (error?.response?.status === 402) {
                setDialogoExito({
                    open: true,
                    title: "No se puede registrar el pedido",
                    message: 'No se puede cargar un detalle, sin la cantidad',
                })

            }
        }

    }
    return (
        <>
            <Grid container style={{ backgroundColor: '#419df3' }}>
                <Form
                    title={pedido?.pedido?.numeroPedido || pedido?.pedido?.nombre ? 'Editar pedido ' : 'Registrar Pedido'}
                    descripcion={pedido?.pedido?.numeroPedido || pedido?.pedido?.nombre ? 'Formulario para editar pedido ' : "Formulario para registrar pedido"}
                    onSubmit={registrarPedido}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <Form.Input
                                label='Fecha Pedido'
                                name='fechaPedido'
                                placeholder="Fecha de Pedido"
                                type="date"
                                defaultValue={formValues.fechaPedido}
                            />

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Form.Input
                                label='Numero pedido'
                                name='numeroPedido'
                                placeholder="Numero de pedido"
                                type="number"
                                defaultValue={formValues.numeroPedido}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Form.Input
                                label='Nombre'
                                name='nombre'
                                placeholder="nombre"
                                type="text"
                                defaultValue={formValues.nombre}
                            />
                        </Grid>

                        <Grid item xs={12} sm={1}>
                            <Form.Input
                                label='Pizza'
                                name='pizza'
                                placeholder="pizza"
                                type="number"
                                defaultValue={formValues.pizza}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form.Input
                                label="Detalle de pizza"
                                name="detallepizza"
                                placeholder="detalle de pizza"
                                type="text"
                                defaultValue={formValues.detallepizza}
                            />
                        </Grid>
                        <Grid item xs={12} sm={1}>
                            <Form.Input
                                label='Precio pizza'
                                name='preciopizza'
                                placeholder="preciopizza"
                                type="number"
                                defaultValue={formValues.preciopizza}
                            />
                        </Grid>

                        <Grid item xs={12} sm={1}>
                            <Form.Input
                                label='Empanadas'
                                name='empanada'
                                placeholder="empanada"
                                type="number"
                                defaultValue={formValues.empanada}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form.Input
                                label='Detalle empanada'
                                name='detalleempanada'
                                placeholder="detalle de empanada"
                                type="text"
                                defaultValue={formValues.detalleempanada}
                            />
                        </Grid>
                        <Grid item xs={12} sm={1}>
                            <Form.Input
                                label='precio emp'
                                name='precioempanada'
                                placeholder="empanada"
                                type="number"
                                defaultValue={formValues.precioempanada}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Form.Input
                                label='Cono de papas'
                                name='cono'
                                placeholder="cono"
                                type="number"
                                defaultValue={formValues.cono}
                            />

                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Form.Input
                                label='Detalle cono'
                                name='detallecono'
                                placeholder="detalle cono"
                                type="text"
                                defaultValue={formValues.detallecono}
                            />
                        </Grid>
                        <Grid item xs={12} sm={1}>
                            <Form.Input
                                label='Precio cono'
                                name='preciocono'
                                placeholder="preciocono"
                                type="number"
                                defaultValue={formValues.preciocono}
                            />

                        </Grid>
                        <Grid item xs={12} sm={1}>
                            <Form.Input
                                label='Lomitos'
                                name='lomito'
                                placeholder="lomito"
                                type="number"
                                defaultValue={formValues.lomito}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form.Input
                                label='Detalle lomo'
                                name='detallelomo'
                                placeholder="detalleLomo"
                                type="text"
                                defaultValue={formValues.detallelomo}
                            />
                        </Grid>
                        <Grid item xs={12} sm={1}>
                            <Form.Input
                                label='preciolomito'
                                name='preciolomito'
                                placeholder="preciolomito"
                                type="number"
                                defaultValue={formValues.preciolomito}
                            />
                        </Grid>
                        <Grid item xs={12} sm={1.3}>
                            <Form.Input
                                label='Hamburguesa'
                                name='hamburguesa'
                                placeholder="hamburguesa"
                                type="number"
                                defaultValue={formValues.hamburguesa}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3.4}>
                            <Form.Input
                                label='Detalle Hamburguesa'
                                name='detallehamburguesa'
                                placeholder="deTalle hamburguesa"
                                type="text"
                                defaultValue={formValues.detallehamburguesa}
                            />
                        </Grid>
                        <Grid item xs={12} sm={1.3}>
                            <Form.Input
                                label='preciohamburguesa'
                                name='preciohamburguesa'
                                placeholder="preciohamburguesa"
                                type="number"
                                defaultValue={formValues.preciohamburguesa}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Form.Input
                                label='pancho'
                                name='pancho'
                                placeholder="pancho"
                                type="number"
                                defaultValue={formValues.hamburguesa}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form.Input
                                label='detalle pancho'
                                name='detallepancho'
                                placeholder="detalle pancho"
                                type="text"
                                defaultValue={formValues.detallepancho}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="flex-end">
                        <Form.SubmitButton
                            buttonText={pedido?.pedido?.numeroPedido || pedido?.pedido?.nombre ? 'Editar pedido' : 'crear un pedido'}
                            isLoading={isLoading}
                        />
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

            </Grid>


        </>
    )

}