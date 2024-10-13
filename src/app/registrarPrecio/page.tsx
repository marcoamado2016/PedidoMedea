
'use client'
import { Form } from "@/components/Form";
import { useProductoPrecioFetch } from "@/hooks/useProductoPrecio";
import { Grid } from "@mui/material";
import React, { useState } from "react";
import MiDialog2 from "../MiDialog2/MiDialog2";
import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation"
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
export default function RegistrarPrecio() {
    let router = useRouter();
    const [dialogoExito, setDialogoExito] = React.useState<OpenDialog>({
        open: false,
        title: '',
        message: ''
    })
    const [formValues, setFormValues] = useState({
        fechaProducto: getCurrentDate(),
        pizza: '',
        empanada: '',
        empanadam: '',
        pizzam: '',
        empanadau: '',
        cono: '',
        lomito: '',
        hamburguesa: '',
        pancho: ''

    })
    const productoFetch = useProductoPrecioFetch();
    const setDefaultValues = () => {
        setFormValues({
            fechaProducto: getCurrentDate(),
            pizza: '',
            empanada: '',
            empanadam: '',
            pizzam: '',
            empanadau: '',
            cono: '',
            lomito: '',
            hamburguesa: '',
            pancho: ''
        })
    }
    const registrarPrducto = async (formData: any) => {
        try {
            const producto = await productoFetch({
                endpoind: 'save',
                formData
            })
            console.log("producto ", producto)
            if (producto.status === 200) {
                console.log("Entre", producto.status)
                setDialogoExito({
                    open: true,
                    title: "Precio de producto guardado ",
                    message: 'Exito',
                })
            }
            setDefaultValues();
        } catch (error) {
            console.log("Error en el frontend ", error)
        }
    }
    return (
        <>
            <Grid container style={{ backgroundColor: '#419df3' }}>
                <Form
                    title={'Formulario para registrar el precio de los productos'}
                    descripcion={'Ingrese los precios por unidad'}
                    onSubmit={registrarPrducto}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} >
                            <Form.Input
                                label='Fecha Producto'
                                name='fechaProducto'
                                placeholder="Fecha de Producto"
                                type="date"
                                disable={false}
                                defaultValue={formValues.fechaProducto}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} >
                            <Form.Input
                                label="hamburguesa"
                                name="hamburguesa"
                                type="number"
                                placeholder="hamburguesa"
                                disable={false}
                                defaultValue={formValues.hamburguesa}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} >
                            <Form.Input
                                label="Pancho"
                                name="pancho"
                                type="number"
                                placeholder="pancho"
                                disable={false}
                                defaultValue={formValues.pancho}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} >
                            <Form.Input
                                label="Pizza"
                                name="pizza"
                                type="number"
                                placeholder="pizza"
                                disable={false}
                                defaultValue={formValues.pizza}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} >
                            <Form.Input
                                label="1/2 Pizza"
                                name="pizzam"
                                type="number"
                                placeholder="pizza"
                                disable={false}
                                defaultValue={formValues.pizzam}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2} >
                            <Form.Input
                                label="empanada docena"
                                name="empanada"
                                type="number"
                                placeholder="empanada"
                                disable={false}
                                defaultValue={formValues.empanada}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2} >
                            <Form.Input
                                label="empanada 1/2 docena"
                                name="empanadam"
                                type="number"
                                placeholder="empanada"
                                disable={false}
                                defaultValue={formValues.empanadam}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2} >
                            <Form.Input
                                label="empanada unidad"
                                name="empanadau"
                                type="number"
                                placeholder="empanada"
                                disable={false}
                                defaultValue={formValues.empanadau}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <Form.Input
                                label="cono"
                                name="cono"
                                type="number"
                                placeholder="cono"
                                disable={false}
                                defaultValue={formValues.cono}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <Form.Input
                                label="lomito"
                                name="lomito"
                                type="number"
                                placeholder="lomito"
                                disable={false}
                                defaultValue={formValues.lomito}
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
                                buttonText="Registrar precios"
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