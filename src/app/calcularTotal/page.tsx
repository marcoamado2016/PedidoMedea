
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
export default function TotalVendido() {
    let router = useRouter();
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
        total: ''

    })
    const productoFetch = useProductoPrecioFetch();
    const setDefaultValues = () => {
        setFormValues({
            fechaVenta: getCurrentDate(),
            totalHamburguesa: '',
            totalpizza: '',
            totalempanada: '',
            totalcono: '',
            totallomito: '',
            total: ''
        })
    }
    const registrarPrducto = async (formData: any) => {
        try {
            console.log("")
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
                    onSubmit={registrarPrducto}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} >
                            <Form.Input
                                label='Fecha Venta'
                                name='fechaVenta'
                                placeholder="Fecha de Venta"
                                type="date"
                                disable={false}
                                defaultValue={formValues.fechaVenta}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} >
                            <Form.Input
                                label="Cantidad Hamburguesa"
                                name="totalhamburguesa"
                                type="number"
                                placeholder="Total Hamburguesa"
                                disable={false}
                                defaultValue={formValues.totalHamburguesa}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} >
                            <Form.Input
                                label="Cantidad Pizza"
                                name="totalpizza"
                                type="number"
                                placeholder="Total Pizza"
                                disable={false}
                                defaultValue={formValues.totalpizza}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} >
                            <Form.Input
                                label="Cantidad empanadas"
                                name="totalempanada"
                                type="number"
                                placeholder="Total empanadas"
                                disable={false}
                                defaultValue={formValues.totalempanada}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} >
                            <Form.Input
                                label="Cantidad conos"
                                name="totalcono"
                                type="number"
                                placeholder="Total conos"
                                disable={false}
                                defaultValue={formValues.totalcono}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} >
                            <Form.Input
                                label="Cantidad Lomitos"
                                name="totallomito"
                                type="number"
                                placeholder="Total Lomitos"
                                disable={false}
                                defaultValue={formValues.totallomito}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} >
                            <Form.Input
                                label=" $ Total Ganancia"
                                name="total"
                                type="number"
                                placeholder=" $ Total Ganancia"
                                disable={false}
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
                                buttonText="calcular total"
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