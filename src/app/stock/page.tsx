'use client'
import { Form } from "@/components/Form"
import { Grid } from "@mui/material"
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation"
import { useStockProductoFetch } from "@/hooks/useStockFetch";
import { StockService } from "../api/apiStock/stock.api";
import MiDialog2 from "../MiDialog2/MiDialog2";
const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Mes de 0 a 11
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
interface OpenDialog {
    open: boolean;
    title: string;
    message: string;
    action?: () => void;
}
export default function RegistrarStock() {
    let router = useRouter();
    const stockProductoRouter = useStockProductoFetch()
    const [hamburguesa, setHamburguesa] = useState<string>("");
    const [lomito, setLomito] = useState<string>("");
    const [pizza, setPizza] = useState<string>("");
    const [cono, setCono] = useState<string>("")
    const [pancho, setPancho] = useState<string>("");
    const [fecha, setFecha] = useState<string>("")
    const [empanada, setEmpanada] = useState<string>("");
    const [dialogoExito, setDialogoExito] = React.useState<OpenDialog>({
        open: false,
        title: '',
        message: ''
    })
    const [formValues, setFormValues] = useState({
        fechastock: getCurrentDate(),
        stockhamburguesa: '',
        stockpancho: '',
        stockpizza: '',
        stockempanada: '',
        stockcono: '',
        stocklomito: '',
        stockhamburguesaActual: '0',
        stockpanchoActual: '0',
        stockpizzaActual: '0',
        stockempanadaActua: '0',
        stockconoActual: '0',
        stocklomitoActual: '0'
    })
    useEffect(() => {
        let servicioStock = new StockService()
        servicioStock.obtenerStock()
            .then((response) => {
                if (response.stock[0]) {
                    response.stock[0].stockhamburguesa !== "0" ? setHamburguesa(response.stock[0].stockhamburguesa) : setHamburguesa("");
                    response.stock[0].stockpancho !== "0" ? setPancho(response.stock[0].stockpancho) : setPancho("");
                    response.stock[0].stockpizza !== "0" ? setPizza(response.stock[0].stockpizza) : setPizza("");
                    response.stock[0].stockempanada !== "0" ? setEmpanada(response.stock[0].stockempanada) : setEmpanada("");
                    response.stock[0].stockcono !== "0" ? setCono(response.stock[0].stockcono) : setCono("");
                    response.stock[0].stocklomito !== "0" ? setLomito(response.stock[0].stocklomito) : setLomito("");
                    setFecha(response.stock[0].fechastock)

                }
            })
            .catch((error) => { throw Error(error) })
    }, [])
    const registrarStock = async (formData: any) => {
        formData.stockhamburguesaActual = '0';
        formData.stockpanchoActual = '0';
        formData.stockpizzaActual = '0';
        formData.stockempanadaActua = '0';
        formData.stockconoActual = '0';
        formData.stocklomitoActual = '0';

        console.log("Forma", formData)

        try {

            const response = await stockProductoRouter({
                endpoind: 'save',
                formData
            })
            console.log("RESPONSE1234 ", response)
            if (response.status === 200) {
                setDialogoExito({
                    open: true,
                    title: "Stock guardado ",
                    message: 'Exito',
                })
            }
        } catch (error) {

        }
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
                        <Grid item xs={12} sm={4} >
                            <Form.Input
                                label='Fecha Producto'
                                name='fechastock'
                                placeholder="Fecha de Producto"
                                type="date"
                                disable={false}
                                defaultValue={formValues.fechastock}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            <Form.Input
                                label="hamburguesa"
                                name="stockhamburguesa"
                                type="number"
                                placeholder="hamburguesa"
                                disable={false}
                                defaultValue={hamburguesa !== "" ? hamburguesa : formValues.stockhamburguesa}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            <Form.Input
                                label="Pancho"
                                name="stockpancho"
                                type="number"
                                placeholder="pancho"
                                disable={false}
                                defaultValue={pancho !== "" ? pancho : formValues.stockpancho}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            <Form.Input
                                label="Pizza"
                                name="stockpizza"
                                type="number"
                                placeholder="pizza"
                                disable={false}
                                defaultValue={pizza !== "" ? pizza : formValues.stockpizza}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            <Form.Input
                                label="empanada docena"
                                name="stockempanada"
                                type="number"
                                placeholder="empanada"
                                disable={false}
                                defaultValue={empanada !== "" ? empanada : formValues.stockempanada}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            <Form.Input
                                label="cono"
                                name="stockcono"
                                type="number"
                                placeholder="cono"
                                disable={false}
                                defaultValue={cono !== "" ? cono : formValues.stockcono}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            <Form.Input
                                label="lomito"
                                name="stocklomito"
                                type="number"
                                placeholder="lomito"
                                disable={false}
                                defaultValue={lomito !== "" ? lomito : formValues.stocklomito}
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