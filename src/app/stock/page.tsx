'use client'
import { Form } from "@/components/Form"
import { Grid } from "@mui/material"
import { useState } from "react"
import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation"
export default function RegistrarStock() {
    let router = useRouter();
    const [formValues, setFormValues] = useState({
        fechastock: '',
        stockhamburguesa: '',
        stockpancho: '',
        stockpizza: '',
        stockempanada: '',
        stockcono: '',
        stocklomito: ''
    })
    const registrarStock = async (formData: any) => {
        console.log("Forma", formData)
    }

    return (
        <>
            <Grid container style={{ backgroundColor: '#419df3' }}>
                <Form
                    title={'Formulario para registrar la cantidad total de productos a vender'}
                    descripcion={'Ingrese los precios por unidad de producto'}
                    onSubmit={registrarStock}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} >
                            <Form.Input
                                label='Fecha Producto'
                                name='fechastock'
                                placeholder="Fecha de Producto"
                                type="date"
                                disable={false}
                                defaultValue={formValues.fechastock}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} >
                            <Form.Input
                                label="hamburguesa"
                                name="stockhamburguesa"
                                type="number"
                                placeholder="hamburguesa"
                                disable={false}
                                defaultValue={formValues.stockhamburguesa}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} >
                            <Form.Input
                                label="Pancho"
                                name="stockpancho"
                                type="number"
                                placeholder="pancho"
                                disable={false}
                                defaultValue={formValues.stockpancho}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} >
                            <Form.Input
                                label="Pizza"
                                name="stockpizza"
                                type="number"
                                placeholder="pizza"
                                disable={false}
                                defaultValue={formValues.stockpizza}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2} >
                            <Form.Input
                                label="empanada docena"
                                name="stockempanada"
                                type="number"
                                placeholder="empanada"
                                disable={false}
                                defaultValue={formValues.stockempanada}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <Form.Input
                                label="cono"
                                name="stockcono"
                                type="number"
                                placeholder="cono"
                                disable={false}
                                defaultValue={formValues.stockcono}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <Form.Input
                                label="lomito"
                                name="stocklomito"
                                type="number"
                                placeholder="lomito"
                                disable={false}
                                defaultValue={formValues.stocklomito}
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
                                buttonText="Registrar Stock"
                            />
                        </Grid>
                    </Grid>
                </Form>

            </Grid>

        </>)
}