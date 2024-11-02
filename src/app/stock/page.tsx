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
    const stockProductoRouter = useStockProductoFetch();
    const [hamburguesa, setHamburguesa] = useState<string>("0");
    const [lomito, setLomito] = useState<string>("0");
    const [pizza, setPizza] = useState<string>("0");
    const [cono, setCono] = useState<string>("0")
    const [pancho, setPancho] = useState<string>("0");
    const [empanada, setEmpanada] = useState<string>("0");

    const [hamburguesaActual, setHamburguesaActual] = useState<string>("0");
    const [lomitoActual, setLomitoActual] = useState<string>("0");
    const [pizzaActual, setPizzaActual] = useState<string>("0");
    const [conoActual, setConoActual] = useState<string>("0")
    const [panchoActual, setPanchoActual] = useState<string>("0");
    const [empanadaActual, setEmpanadaActual] = useState<string>("0");
    const [evento, setEvento] = useState<boolean>(false);
    const [fecha, setFecha] = useState<string>("")
    const [dialogoExito, setDialogoExito] = React.useState<OpenDialog>({
        open: false,
        title: '',
        message: ''
    })
    const [formValues, setFormValues] = useState({
        fechastock: getCurrentDate(),
        stockhamburguesa: '0',
        stockpancho: '0',
        stockpizza: '0',
        stockempanada: '0',
        stockcono: '0',
        stocklomito: '0',
        stockhamburguesaActual: '0',
        stockpanchoActual: '0',
        stockpizzaActual: '0',
        stockempanadaActual: '0',
        stockconoActual: '0',
        stocklomitoActual: '0'
    })
    useEffect(() => {
        actualizarDatos().then((response) => console.log("OK", response)).catch((err) => console.log("ERROR", err));
    }, [])
    const actualizarDatos = async () => {
        let servicioStock = new StockService()
        servicioStock.obtenerStock()
            .then((response) => {
                if (response.stock[0]) {
                    response.stock[0].stockhamburguesa !== "0" ? setHamburguesa(response.stock[0].stockhamburguesa) : setHamburguesa("0");
                    response.stock[0].stockpancho !== "0" ? setPancho(response.stock[0].stockpancho) : setPancho("0");
                    response.stock[0].stockpizza !== "0" ? setPizza(response.stock[0].stockpizza) : setPizza("0");
                    response.stock[0].stockempanada !== "0" ? setEmpanada(response.stock[0].stockempanada) : setEmpanada("0");
                    response.stock[0].stockcono !== "0" ? setCono(response.stock[0].stockcono) : setCono("0");
                    response.stock[0].stocklomito !== "0" ? setLomito(response.stock[0].stocklomito) : setLomito("0");
                    response.stock[0].stockconoActual !== "0" ? setConoActual(response.stock[0].stockconoActual) : setConoActual("0");
                    response.stock[0].stockempanadaActual !== "0" ? setEmpanadaActual(response.stock[0].stockempanadaActual) : setEmpanadaActual("0");
                    response.stock[0].stockhamburguesaActual !== "0" ? setHamburguesaActual(response.stock[0].stockhamburguesaActual) : setHamburguesaActual("0");
                    response.stock[0].stocklomitoActual !== "0" ? setLomitoActual(response.stock[0].stocklomitoActual) : setLomitoActual("0");
                    response.stock[0].stockpanchoActual !== "0" ? setPanchoActual(response.stock[0].stockpanchoActual) : setPanchoActual("0");
                    response.stock[0].stockpizzaActual !== "0" ? setPizzaActual(response.stock[0].stockpizzaActual) : setPizzaActual("0");
                    response.stock[0].fechastock !== "" ? setFecha(response.stock[0].fechastock) : setFecha("")
                }
            })
            .catch((error) => { console.log("ERROR STOCK ", error) })
    }
    const registrarStock = async (formData: any) => {
        try {
            if (!evento) {
                formData.stockhamburguesa = formData.stockhamburguesa ? formData.stockhamburguesa : hamburguesa;
                formData.stockpancho = formData.stockpancho ? formData.stockpancho : pancho;
                formData.stockpizza = formData.stockpizza ? formData.stockpizza : pizza
                formData.stockempanada = formData.stockempanada ? formData.stockempanada : empanada;
                formData.stockcono = formData.stockcono ? formData.stockcono : cono;
                formData.stocklomito = formData.stocklomito ? formData.stocklomito : lomito;
                formData.stockhamburguesaActual = formData.stockhamburguesa;
                formData.stockpanchoActual = formData.stockpancho;
                formData.stockpizzaActual = formData.stockpizza;
                formData.stockempanadaActual = formData.stockempanada;
                formData.stockconoActual = formData.stockcono;
                formData.stocklomitoActual = formData.stocklomito;
                const modificarStock = await stockProductoRouter({
                    endpoind: 'change-stock',
                    formData
                })
                if (modificarStock.status === 200) {
                    setHamburguesa(formData.stockhamburguesa);
                    setPancho(formData.stockpancho);
                    setPizza(formData.stockpizza);
                    setCono(formData.stockcono);
                    setEmpanada(formData.stockempanada);
                    setDialogoExito({
                        open: true,
                        title: "Stock Modificado",
                        message: 'Exito',
                    })
                }
            }
            if (evento) {
                formData.stockhamburguesaActual = String(parseFloat(formData.stockhamburguesa || 0) + parseFloat(hamburguesa));
                formData.stockpanchoActual = String(parseFloat(formData.stockpancho || 0) + parseFloat(pancho));
                formData.stockpizzaActual = String(parseFloat(formData.stockpizza || 0) + parseFloat(pizzaActual));
                formData.stockempanadaActual = String(parseFloat(formData.stockempanada || 0) + parseFloat(empanada));
                formData.stockconoActual = String(parseFloat(formData.stockcono || 0) + parseFloat(cono));
                formData.stocklomitoActual = String(parseFloat(formData.stocklomito || 0) + parseFloat(lomito));
                formData.stockhamburguesa = String(parseFloat(formData.stockhamburguesa || 0) + parseFloat(hamburguesa));
                formData.stockpancho = String(parseFloat(formData.stockpancho || 0) + parseFloat(pancho));
                formData.stockpizza = String(parseFloat(formData.stockpizza || 0) + parseFloat(pizza));
                formData.stockempanada = String(parseFloat(formData.stockempanada || 0) + parseFloat(empanada));
                formData.stockcono = String(parseFloat(formData.stockcono || 0) + parseFloat(cono));
                formData.stocklomito = String(parseFloat(formData.stocklomito || 0) + parseFloat(lomito));
                const guardarStock = await stockProductoRouter({
                    endpoind: 'change-stock',
                    formData
                })
                if (guardarStock.status === 200) {
                    setHamburguesa(formData.stockhamburguesa);
                    setPancho(formData.stockpancho);
                    setPizza(formData.stockpizza);
                    setCono(formData.stockcono);
                    setEmpanada(formData.stockempanada);
                    setDialogoExito({
                        open: true,
                        title: "Stock Agregado ",
                        message: 'Exito',
                    })
                }
            }

        } catch (error) {
            console.log("Error en el frontend registrar stock", error);
        }
    }

    return (
        <>
            <Grid container style={{ backgroundColor: '#419df3' }}>
                <Form
                    title={'Formulario para registrar STOCK total de productos a vender'}
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
                                label="Total hamburguesa"
                                name="stockhamburguesa"
                                type="number"
                                placeholder="hamburguesa"
                                disable={false}
                                defaultValue={hamburguesa !== "" ? hamburguesa : formValues.stockhamburguesa}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            <Form.Input
                                label="Total Pancho"
                                name="stockpancho"
                                type="number"
                                placeholder="pancho"
                                disable={false}
                                defaultValue={pancho !== "" ? pancho : formValues.stockpancho}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            <Form.Input
                                label="Total Pizza"
                                name="stockpizza"
                                type="number"
                                placeholder="pizza"
                                disable={false}
                                defaultValue={pizza !== "" ? pizza : formValues.stockpizza}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            <Form.Input
                                label="Total empanada"
                                name="stockempanada"
                                type="number"
                                placeholder="empanada"
                                disable={false}
                                defaultValue={empanada !== "" ? empanada : formValues.stockempanada}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            <Form.Input
                                label="Total cono"
                                name="stockcono"
                                type="number"
                                placeholder="cono"
                                disable={false}
                                defaultValue={cono !== "" ? cono : formValues.stockcono}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            <Form.Input
                                label="Total lomito"
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
                                buttonText="Modificar Stock"
                                onClick={() => setEvento(false)}
                            />
                        </Grid>
                        <Grid item xs={6} container justifyContent="flex-end">
                            <Form.SubmitButton
                                buttonText="Agregar Stock"
                                onClick={() => setEvento(true)}
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
            <Grid container style={{ backgroundColor: '#419df3' }}>
                <Form
                    title={'Cantidad de producto disponibles a vender'}
                    descripcion={'Me quedan productos para vender: '}
                    onSubmit={actualizarDatos}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4} >
                            <Form.Input
                                label='Fecha Producto'
                                name='fechastock'
                                placeholder="Fecha de Producto"
                                type="date"
                                disable={true}
                                defaultValue={formValues.fechastock}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            <Form.Input
                                label="hamburguesa Disponible"
                                name="stockhamburguesaActual"
                                type="number"
                                placeholder="hamburguesa"
                                disable={true}
                                defaultValue={hamburguesaActual}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            <Form.Input
                                label="Pancho Disponible"
                                name="stockpanchoActual"
                                type="number"
                                placeholder="pancho"
                                disable={true}
                                defaultValue={panchoActual}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            <Form.Input
                                label="Pizza Disponible"
                                name="stockpizzaActual"
                                type="number"
                                placeholder="pizza"
                                disable={true}
                                defaultValue={pizzaActual}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            <Form.Input
                                label="Empanada Disponible"
                                name="stockempanadaActual"
                                type="number"
                                placeholder="empanada"
                                disable={true}
                                defaultValue={empanadaActual}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            <Form.Input
                                label="Cono Disponible"
                                name="stockconoActual"
                                type="number"
                                placeholder="cono"
                                disable={true}
                                defaultValue={conoActual}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            <Form.Input
                                label="Lomito Disponible"
                                name="stocklomitoActual"
                                type="number"
                                placeholder="lomito"
                                disable={true}
                                defaultValue={lomitoActual}
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
                                buttonText="Actualizar datos Stock"
                            />
                        </Grid>

                    </Grid>
                </Form>

            </Grid>
        </>)
}