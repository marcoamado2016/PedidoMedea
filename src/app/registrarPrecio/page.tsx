
'use client'
import { Form } from "@/components/Form";
import { useProductoPrecioFetch } from "@/hooks/useProductoPrecio";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import MiDialog2 from "../MiDialog2/MiDialog2";
import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation"
import { ProductoPrecioService } from "../api/apiPrecios/precios.api";
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
    const [empanada, setEmpanada] = useState<string>("");
    const [empanadam, setEmpanadam] = useState<string>("");
    const [empanadau, setEmpanadau] = useState<string>("");
    const [hamburguesa, setHamburguesa] = useState<string>("");
    const [lomito, setLomito] = useState<string>("");
    const [pizza, setPizza] = useState<string>("");
    const [pizzam, setPizzam] = useState<string>("");
    const [cono, setCono] = useState<string>("")
    const [pancho, setPancho] = useState<string>("");
    const [fecha, setFecha] = useState<string>("")
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
    useEffect(() => {
        let precioProducto = new ProductoPrecioService();
        precioProducto.obtenerPrecios()
            .then((response) => {
                if (response.productoPrecio[0]) {
                    response.productoPrecio[0].empanada !== "0" ? setEmpanada(response.productoPrecio[0].empanada) : setEmpanada("");
                    response.productoPrecio[0].hamburguesa !== "0" ? setHamburguesa(response.productoPrecio[0].hamburguesa) : setHamburguesa("");
                    response.productoPrecio[0].empanadam !== "0" ? setEmpanadam(response.productoPrecio[0].empanadam) : setEmpanadam("");
                    response.productoPrecio[0].empanadau !== "0" ? setEmpanadau(response.productoPrecio[0].empanadau) : setEmpanadau("");
                    response.productoPrecio[0].lomito !== "0" ? setLomito(response.productoPrecio[0].lomito) : setLomito("");
                    response.productoPrecio[0].pizza !== "0" ? setPizza(response.productoPrecio[0].pizza) : setPizza("");
                    response.productoPrecio[0].pizzam !== "0" ? setPizzam(response.productoPrecio[0].pizzam) : setPizzam("");
                    response.productoPrecio[0].cono !== "0" ? setCono(response.productoPrecio[0].cono) : setCono("");
                    response.productoPrecio[0].pancho !== "0" ? setPancho(response.productoPrecio[0].pancho) : setPancho("");
                    response.productoPrecio[0].fechaProducto !== "" ? setFecha(response.productoPrecio[0].fechaProducto) : setFecha("");
                }


            }).catch((error) => console.log("Error obtener precio ", error))
    }, [])

    const registrarPrducto = async (formData: any) => {
        try {
            if (fecha !== "") {
                formData.empanada = formData.empanada ? formData.empanada : empanada;
                formData.pizza = formData.pizza ? formData.pizza : pizza;
                formData.empanadam = formData.empanadam ? formData.empanadam : empanadam;
                formData.pizzam = formData.pizzam ? formData.pizzam : pizzam;
                formData.empanadau = formData.empanadau ? formData.empanadau : empanadau;
                formData.cono = formData.cono ? formData.cono : cono;
                formData.lomito = formData.lomito ? formData.lomito : lomito;
                formData.hamburguesa = formData.hamburguesa ? formData.hamburguesa : hamburguesa;
                formData.pancho = formData.pancho ? formData.pancho : pancho;
                formData.fechaProducto = formData.fechaProducto ? formData.fechaProducto : fecha;
                const productoModificado = await productoFetch({
                    endpoind: 'change-producto',
                    formData
                })
                if (productoModificado.status === 200) {
                    setEmpanada(formData.empanada);
                    setHamburguesa(formData.hamburguesa);
                    setEmpanadam(formData.empanadam);
                    setEmpanadau(formData.empanadau);
                    setLomito(formData.lomito);
                    setPizza(formData.pizza);
                    setPizzam(formData.pizzam);
                    setCono(formData.cono);
                    setPancho(formData.pancho);
                    setFecha(formData.fechaProducto);
                    setDialogoExito({
                        open: true,
                        title: "Precio de producto modificado ",
                        message: 'Exito',
                    })
                }
            } else {
                const producto = await productoFetch({
                    endpoind: 'save',
                    formData
                })
                if (producto.status === 200) {
                    setDialogoExito({
                        open: true,
                        title: "Precio de producto guardado ",
                        message: 'Exito',
                    })
                }
            }

        } catch (error) {
            console.log("Error en el frontend registrar precio", error);
        }
    }
    return (
        <>
            <Grid container style={{ backgroundColor: '#419df3' }}>
                <Form
                    title={'Formulario para registrar el precio de los productos'}
                    descripcion={'Ingrese los precios por unidad de producto , si no lo quiere vender ponga cero(0)'}
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
                                defaultValue={hamburguesa !== "" ? hamburguesa : formValues.hamburguesa}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} >
                            <Form.Input
                                label="Pancho"
                                name="pancho"
                                type="number"
                                placeholder="pancho"
                                disable={false}
                                defaultValue={pancho !== "" ? pancho : formValues.pancho}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} >
                            <Form.Input
                                label="Pizza"
                                name="pizza"
                                type="number"
                                placeholder="pizza"
                                disable={false}
                                defaultValue={pizza !== "" ? pizza : formValues.pizza}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} >
                            <Form.Input
                                label="1/2 Pizza"
                                name="pizzam"
                                type="number"
                                placeholder="pizza"
                                disable={false}
                                defaultValue={pizzam !== "" ? pizzam : formValues.pizzam}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2} >
                            <Form.Input
                                label="empanada docena"
                                name="empanada"
                                type="number"
                                placeholder="empanada"
                                disable={false}
                                defaultValue={empanada !== "" ? empanada : formValues.empanada}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2} >
                            <Form.Input
                                label="empanada 1/2 docena"
                                name="empanadam"
                                type="number"
                                placeholder="empanada"
                                disable={false}
                                defaultValue={empanadam !== "" ? empanadam : formValues.empanadam}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2} >
                            <Form.Input
                                label="empanada unidad"
                                name="empanadau"
                                type="number"
                                placeholder="empanada"
                                disable={false}
                                defaultValue={empanadau !== "" ? empanadau : formValues.empanadau}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <Form.Input
                                label="cono"
                                name="cono"
                                type="number"
                                placeholder="cono"
                                disable={false}
                                defaultValue={cono !== "" ? cono : formValues.cono}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <Form.Input
                                label="lomito"
                                name="lomito"
                                type="number"
                                placeholder="lomito"
                                disable={false}
                                defaultValue={lomito !== "" ? lomito : formValues.lomito}
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