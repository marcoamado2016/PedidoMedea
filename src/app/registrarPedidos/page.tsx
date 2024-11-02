
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
import { PedidoServicio } from "../api/apiPedidos/pedidos.api"
import { ProductoPrecioService } from "../api/apiPrecios/precios.api"
import { StockService } from "../api/apiStock/stock.api"
import { useStockProductoFetch } from "@/hooks/useStockFetch";
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
    const [empanada, setEmpanada] = useState<string>("0");
    const [empanadam, setEmpanadam] = useState<string>("0");
    const [empanadau, setEmpanadau] = useState<string>("0");
    const [hamburguesa, setHamburguesa] = useState<string>("0");
    const [lomito, setLomito] = useState<string>("0");
    const [pizza, setPizza] = useState<string>("0");
    const [pizzam, setPizzam] = useState<string>("0");
    const [cono, setCono] = useState<string>("0")
    const [pancho, setPancho] = useState<string>("0");
    const [contadorEmpanadas, setContadorEmpanadas] = useState<number>(0);
    const [empanadaStock, setEmpanadaStock] = useState<string>("0");
    const [hamburguesaStock, setHamburguesaStock] = useState<string>("0");
    const [lomitoStock, setLomitoStock] = useState<string>("0");
    const [pizzaStock, setPizzaStock] = useState<string>("0");
    const [conoStock, setConoStock] = useState<string>("0")
    const [panchoStock, setPanchoStock] = useState<string>("0");
    const [showModal, setShowModal] = useState<boolean>(false);
    const stockProductoRouter = useStockProductoFetch();
    const [formValuesStock, setFormValuesStock] = useState({
        fechastock: getCurrentDate(),
        stockhamburguesaActual: '0',
        stockpanchoActual: '0',
        stockpizzaActual: '0',
        stockempanadaActual: '0',
        stockconoActual: '0',
        stocklomitoActual: '0'
    })
    const [formValues, setFormValues] = useState({
        numeroPedido: '',
        fechaPedido: pedido?.pedido?.numeroPedido || pedido?.pedido?.nombre ? pedido?.pedido?.fechaPedido : getCurrentDate(),
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
        preciopancho: '',
        total: ''
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
        const stockS = setInterval(() => {
            let stock = new StockService();
            stock.obtenerStock()
                .then((response) => {
                    if (response.stock[0]) {
                        setEmpanadaStock(response.stock[0].stockempanadaActual);
                        setHamburguesaStock(response.stock[0].stockhamburguesaActual);
                        setLomitoStock(response.stock[0].stocklomitoActual);
                        setPizzaStock(response.stock[0].stockpizzaActual);
                        setConoStock(response.stock[0].stockconoActual)
                        setPanchoStock(response.stock[0].stockpanchoActual);
                    }
                })
                .catch((error) => {
                    console.log("ERROR ", error)
                })
        }, 500)
        return () => clearInterval(stockS)
    }, [])
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
                precioempanada: pedido?.pedido?.precioempanada,
                preciopizza: pedido?.pedido?.preciopizza,
                preciolomito: pedido?.pedido?.preciolomito,
                preciocono: pedido?.pedido?.preciocono,
                preciohamburguesa: pedido?.pedido?.preciohamburguesa,
                preciopancho: pedido?.pedido?.preciopancho,
                total: pedido?.pedido?.total
            });
        }
    }, [pedido])
    const [total, setTotal] = useState<number>(0);
    useEffect(() => {
        let ms: string[] = [];
        if (Number(formValues.empanada) > Number(empanadaStock)) {
            ms.push(`${empanadaStock} Empanadas`);
            setDialogoStock({
                open: true,
                title: "Te quedan.",
                message: ms.join("-"),
            })
            setShowModal(true);
        } else {
            ms = ms.filter((m) => m !== `${empanadaStock} Empanadas`);
            setShowModal(false);
        }
        if (Number(formValues.hamburguesa) > Number(hamburguesaStock)) {
            ms.push(`${hamburguesaStock} Hamburguesas`);
            setDialogoStock({
                open: true,
                title: "Te quedan.",
                message: ms.join("-"),
            })
            setShowModal(true);
        } else {
            ms = ms.filter((m) => m !== `${hamburguesaStock} Hamburguesas`);
            setShowModal(false);
        }
        if (Number(formValues.lomito) > Number(lomitoStock)) {
            ms.push(`${lomitoStock} Lomito`);
            setDialogoStock({
                open: true,
                title: "Te quedan.",
                message: ms.join("-"),
            })
            setShowModal(true);
        } else {
            ms = ms.filter((m) => m !== `${lomitoStock} Lomito`);
            setShowModal(false);
        }
        if (Number(formValues.pizza) > Number(pizzaStock)) {
            ms.push(`${pizzaStock} Pizzas`);
            setDialogoStock({
                open: true,
                title: "Te quedan.",
                message: ms.join("-"),
            })
            setShowModal(true);
        } else {
            ms = ms.filter((m) => m !== `${pizzaStock} Pizzas`);
            setShowModal(false);
        }
        if (Number(formValues.cono) > Number(conoStock)) {
            ms.push(`Conos ${conoStock}`);
            setDialogoStock({
                open: true,
                title: "Te quedan.",
                message: ms.join("-"),
            })
            setShowModal(true);
        } else {
            ms = ms.filter((m) => m !== `Conos ${conoStock}`);
            setShowModal(false);
        }
        if (Number(formValues.pancho) > Number(panchoStock)) {
            ms.push(`Panchos ${panchoStock}`);
            setDialogoStock({
                open: true,
                title: "Te quedan.",
                message: ms.join("-"),
            })
            setShowModal(true);
        } else {
            ms = ms.filter((m) => m !== `Panchos ${panchoStock}`);
            setShowModal(false);
        }
    }, [empanadaStock, formValues.empanada, hamburguesaStock, formValues.hamburguesa, lomitoStock, formValues.lomito, pizzaStock, formValues.pizza, conoStock, formValues.cono, panchoStock, formValues.pancho])
    useEffect(() => {
        const calcularTotal = () => {
            let totalEmpanadas: number = 0;
            if (empanada !== "0" && Number(formValues.empanada) > 12) {
                totalEmpanadas = Number(formValues.empanada);
            }
            if (totalEmpanadas > 0) {
                let contador: number = 0;
                let contadorMedia: number = 0;
                let unidades: number = 0;
                for (let i = 1; i <= totalEmpanadas; i++) {
                    contador = contador + 1;
                    if (contador === 6) {
                        contadorMedia = contadorMedia + 1;
                        contador = 0;
                    }
                }
                unidades = totalEmpanadas - (contadorMedia * 6) //unidades
                if (contadorMedia > 0) {
                    unidades * parseFloat(empanadau);
                }
                let docena: number = 0;
                let contadorDocena: number = 0;
                for (let i = 1; i <= contadorMedia; i++) {
                    docena = docena + 6;
                    if (docena == 12) {
                        contadorDocena = contadorDocena + 1;
                        docena = 0;
                    }
                }
                let media: number = 0;
                if (contadorMedia % 2 === 0) {
                    media = 0;
                } else {
                    media = 1;
                }
                setContadorEmpanadas(contador);
                formValues.precioempanada = String((unidades * parseFloat(empanadau)) + (media * parseFloat(empanadam)) + (contadorDocena * parseFloat(empanada)));

            }
            if (empanadau !== "0" && Number(formValues.empanada) < 6) {
                formValues.precioempanada = String(parseFloat(empanadau) * parseFloat(formValues.empanada));
            }
            if (empanadam !== "0" && formValues.empanada === "6") {
                formValues.precioempanada = empanadam;
            }
            if (empanada !== "0" && formValues.empanada === "12") {
                formValues.precioempanada = empanada;
            }
            if (Number(formValues.empanada) > 6 && Number(formValues.empanada) < 12) {
                let mediaDocena = parseFloat(formValues.empanada) - 6;
                formValues.precioempanada = String((mediaDocena * parseFloat(empanadau)) + parseFloat(empanadam));
            }
            if (formValues.pizza === "0.5") {
                if (pizzam !== "0") {
                    formValues.preciopizza = pizzam;
                }
            }
            if (formValues.pizza !== "0.5") {
                if (pizza !== "0") {
                    formValues.preciopizza = String(parseFloat(pizza) * parseFloat(formValues.pizza));
                }
            }
            if (cono !== "0") {
                formValues.preciocono = String(parseFloat(cono) * parseFloat(formValues.cono));
            }
            if (hamburguesa !== "0") {
                formValues.preciohamburguesa = String(parseFloat(hamburguesa) * parseFloat(formValues.hamburguesa));
            }
            if (lomito !== "0") {
                formValues.preciolomito = String(parseFloat(lomito) * parseFloat(formValues.lomito));
            }
            if (pancho !== "0") {
                formValues.preciopancho = String(parseFloat(pancho) * parseFloat(formValues.pancho));
            }
            const suma = (parseFloat(cono === "0" ? String(parseFloat(formValues.cono) * parseFloat(formValues.preciocono)) : formValues.preciocono) || 0) +
                (parseFloat(formValues.precioempanada) || 0) +
                (parseFloat(hamburguesa === "0" ? String(parseFloat(formValues.hamburguesa) * parseFloat(formValues.preciohamburguesa)) : formValues.preciohamburguesa) || 0) +
                (parseFloat(lomito === "0" ? String(parseFloat(formValues.lomito) * parseFloat(formValues.preciolomito)) : formValues.preciolomito) || 0) +
                (parseFloat(pancho === "0" ? String(parseFloat(formValues.pancho) * parseFloat(formValues.preciopancho)) : formValues.preciopancho) || 0) +
                (parseFloat(formValues.preciopizza) || 0);
            setTotal(suma)
        }
        calcularTotal();
    }, [formValues])
    useEffect(() => {
        setContadorEmpanadas(0);
    }, [formValues.empanada === ""])

    useEffect(() => {
        const obtenerPrecio = setInterval(() => {
            let preciosProducto = new ProductoPrecioService()
            preciosProducto.obtenerPrecios().then((response) => {
                if (response.productoPrecio[0]) {
                    response.productoPrecio[0].empanada !== "0" ? setEmpanada(response.productoPrecio[0].empanada) : setEmpanada("0");
                    response.productoPrecio[0].hamburguesa !== "0" ? setHamburguesa(response.productoPrecio[0].hamburguesa) : setHamburguesa("0");
                    response.productoPrecio[0].empanadam !== "0" ? setEmpanadam(response.productoPrecio[0].empanadam) : setEmpanadam("0");
                    response.productoPrecio[0].empanadau !== "0" ? setEmpanadau(response.productoPrecio[0].empanadau) : setEmpanadau("0");
                    response.productoPrecio[0].lomito !== "0" ? setLomito(response.productoPrecio[0].lomito) : setLomito("0");
                    response.productoPrecio[0].pizza !== "0" ? setPizza(response.productoPrecio[0].pizza) : setPizza("0");
                    response.productoPrecio[0].pizzam !== "0" ? setPizzam(response.productoPrecio[0].pizzam) : setPizzam("0");
                    response.productoPrecio[0].cono !== "0" ? setCono(response.productoPrecio[0].cono) : setCono("0");
                    response.productoPrecio[0].pancho !== "0" ? setPancho(response.productoPrecio[0].pancho) : setPancho("0");
                }
            }).catch((error) => console.log("Error precio ", error))
        },500);
        return () => clearInterval(obtenerPrecio);
    }, [])

    const [dialogoExito, setDialogoExito] = React.useState<OpenDialog>({
        open: false,
        title: '',
        message: ''
    })
    const [dialogoStock, setDialogoStock] = React.useState<OpenDialog>({
        open: false,
        title: '',
        message: ''
    })
    const handleChangeInput = (nombre: string, valor: string) => {
        setFormValues(value => (
            {
                ...value,
                [nombre]: valor
            }
        ))
    }
    const handleChangeInput1 = (nombre: string, valor: string) => {
        setFormValues(value => (
            {
                ...value,
                [nombre]: valor
            }
        ))

    }
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
            preciopancho: '',
            total: ''
        });
    }
    const registrarPedido = async (formData: any) => {
        try {
            if (showModal) {
                setDialogoStock({
                    open: true,
                    title: "No se puede realizar la venta",
                    message: "No tiene stock revise los productos ",
                })
            } else {
                if (pedido?.pedido || pedido.nombre) {
                    startLoading()
                    const pedidoCambiado = await pedidoFetch({
                        endpoint: 'change-pedido',
                        formData: formData
                    })
                    if (pedidoCambiado.status == 200) {
                        setDialogoStock({
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
                        console.log("(respuesta.status == 200 ", respuesta.data.pedido)
                        if (respuesta.data.pedido) {
                            console.log("empanadaStock ", String(Number(empanadaStock) - Number(respuesta.data.pedido.empanada)))
                            console.log("conoStock", String(Number(conoStock) - Number(respuesta.data.pedido.cono)))
                            console.log("hamburguesaStock ", String(Number(hamburguesaStock) - Number(respuesta.data.pedido.hamburguesa)))
                            console.log("lomitoStock ", String(Number(lomitoStock) - Number(respuesta.data.pedido.lomito)))
                            console.log("panchoStock", String(Number(panchoStock) - Number(respuesta.data.pedido.pancho)))
                            console.log("pizzaStock ", String(Number(pizzaStock) - Number(respuesta.data.pedido.pizza)))
                            formValuesStock.stockempanadaActual = empanadaStock;
                            formValuesStock.stockconoActual = conoStock;
                            formValuesStock.stockhamburguesaActual = hamburguesaStock;
                            formValuesStock.stocklomitoActual = lomitoStock;
                            formValuesStock.stockpanchoActual = panchoStock
                            formValuesStock.stockpizzaActual = pizzaStock;
                            if (Number(respuesta.data.pedido.empanada) > 0) {
                                formValuesStock.stockempanadaActual = String(Number(empanadaStock) - Number(respuesta.data.pedido.empanada));
                            }
                            if (Number(respuesta.data.pedido.cono) > 0) {
                                formValuesStock.stockconoActual = String(Number(conoStock) - Number(respuesta.data.pedido.cono));
                            }
                            if (Number(respuesta.data.pedido.hamburguesa) > 0) {
                                formValuesStock.stockhamburguesaActual = String(Number(hamburguesaStock) - Number(respuesta.data.pedido.hamburguesa));
                            }
                            if (Number(respuesta.data.pedido.lomito) > 0) {
                                formValuesStock.stocklomitoActual = String(Number(lomitoStock) - Number(respuesta.data.pedido.lomito));
                            }
                            if (Number(respuesta.data.pedido.pancho) > 0) {
                                formValuesStock.stockpanchoActual = String(Number(panchoStock) - Number(respuesta.data.pedido.pancho));
                            }
                            if (Number(respuesta.data.pedido.pizza) > 0) {
                                formValuesStock.stockpizzaActual = String(Number(pizzaStock) - Number(respuesta.data.pedido.pizza));
                            }
                            console.log(" formValuesStock ", formValuesStock)
                            const modificarStock = await stockProductoRouter({
                                endpoind: 'change-stock',
                                formData: formValuesStock
                            })
                        }
                        setDialogoExito({
                            open: true,
                            title: "Registro de pedido",
                            message: 'Exito',
                        })
                    }
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
                    title={pedido?.pedido?.numeroPedido || pedido?.pedido?.nombre ? 'Detalle pedido ' : 'Registrar Pedido'}
                    descripcion={pedido?.pedido?.numeroPedido || pedido?.pedido?.nombre ? 'Formulario para ver detalle pedido ' : "Formulario para registrar pedido"}
                    onSubmit={registrarPedido}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} >
                            <Form.Input
                                label='Fecha Pedido'
                                name='fechaPedido'
                                placeholder="Fecha de Pedido"
                                type="date"
                                defaultValue={formValues.fechaPedido}
                                disable={pedido?.pedido?.numeroPedido || pedido?.pedido?.nombre ? true : false}

                            />

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Form.Input
                                label='Total a pagar $'
                                name='total'
                                type="text"
                                defaultValue={String(total)}
                                disable={true}
                                color={'gray'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Form.Input
                                label='Numero pedido'
                                name='numeroPedido'
                                placeholder="Numero de pedido"
                                type="number"
                                defaultValue={pedido?.pedido?.numeroPedido || pedido?.pedido?.nombre ? pedido?.pedido?.numeroPedido : formValues.numeroPedido}
                                disable={pedido?.pedido?.numeroPedido || pedido?.pedido?.nombre ? true : false}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Form.Input
                                label='Nombre'
                                name='nombre'
                                placeholder="nombre"
                                type="text"
                                defaultValue={formValues.nombre}
                                disable={pedido?.pedido?.numeroPedido || pedido?.pedido?.nombre ? true : false}
                            />
                        </Grid>

                        <Grid item xs={12} sm={1}>
                            <Form.Input
                                label='Pizza'
                                name='pizza'
                                placeholder="pizza"
                                type="number"
                                defaultValue={formValues.pizza}
                                disable={pedido?.pedido?.numeroPedido || pedido?.pedido?.nombre ? true : false}
                                onChange={(e) => handleChangeInput1("pizza", e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form.Input
                                label="Detalle de pizza"
                                name="detallepizza"
                                placeholder="detalle de pizza"
                                type="text"
                                defaultValue={formValues.detallepizza}
                                disable={pedido?.pedido?.numeroPedido || pedido?.pedido?.nombre ? true : false}
                            />
                        </Grid>
                        <Grid item xs={12} sm={1}>
                            <Form.Input
                                label='Precio pizza'
                                name='preciopizza'
                                placeholder="preciopizza"
                                type="number"
                                defaultValue={formValues.preciopizza}
                                onChange={(e) => handleChangeInput("preciopizza", e.target.value)}
                                disable={pedido?.pedido?.numeroPedido || pedido?.pedido?.nombre ? true : false}
                            />
                        </Grid>

                        <Grid item xs={12} sm={1}>
                            <Form.Input
                                label='Empanadas'
                                name='empanada'
                                placeholder="empanada"
                                type="number"
                                defaultValue={formValues.empanada}
                                disable={pedido?.pedido?.numeroPedido || pedido?.pedido?.nombre ? true : false}
                                onChange={(e) => handleChangeInput1("empanada", e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form.Input
                                label='Detalle empanada'
                                name='detalleempanada'
                                placeholder="detalle de empanada"
                                type="text"
                                defaultValue={formValues.detalleempanada}
                                disable={pedido?.pedido?.numeroPedido || pedido?.pedido?.nombre ? true : false}
                            />
                        </Grid>
                        <Grid item xs={12} sm={1}>
                            <Form.Input
                                label='precio emp'
                                name='precioempanada'
                                placeholder="empanada"
                                type="number"
                                defaultValue={formValues.precioempanada}
                                onChange={(e) => handleChangeInput("precioempanada", e.target.value)}
                                disable={pedido?.pedido?.numeroPedido || pedido?.pedido?.nombre ? true : false}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Form.Input
                                label='Cono de papas'
                                name='cono'
                                placeholder="cono"
                                type="number"
                                defaultValue={formValues.cono}
                                disable={pedido?.pedido?.numeroPedido || pedido?.pedido?.nombre ? true : false}
                                onChange={(e) => handleChangeInput1("cono", e.target.value)}
                            />

                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Form.Input
                                label='Detalle cono'
                                name='detallecono'
                                placeholder="detalle cono"
                                type="text"
                                defaultValue={formValues.detallecono}
                                disable={pedido?.pedido?.numeroPedido || pedido?.pedido?.nombre ? true : false}
                            />
                        </Grid>
                        <Grid item xs={12} sm={1}>
                            <Form.Input
                                label='Precio cono'
                                name='preciocono'
                                placeholder="preciocono"
                                type="number"
                                defaultValue={formValues.preciocono}
                                onChange={(e) => handleChangeInput("preciocono", e.target.value)}
                                disable={pedido?.pedido?.numeroPedido || pedido?.pedido?.nombre ? true : false}
                            />

                        </Grid>
                        <Grid item xs={12} sm={1}>
                            <Form.Input
                                label='Lomitos'
                                name='lomito'
                                placeholder="lomito"
                                type="number"
                                defaultValue={formValues.lomito}
                                disable={pedido?.pedido?.numeroPedido || pedido?.pedido?.nombre ? true : false}
                                onChange={(e) => handleChangeInput1("lomito", e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form.Input
                                label='Detalle lomo'
                                name='detallelomo'
                                placeholder="detalleLomo"
                                type="text"
                                defaultValue={formValues.detallelomo}
                                disable={pedido?.pedido?.numeroPedido || pedido?.pedido?.nombre ? true : false}
                            />
                        </Grid>
                        <Grid item xs={12} sm={1}>
                            <Form.Input
                                label='preciolomito'
                                name='preciolomito'
                                placeholder="preciolomito"
                                type="number"
                                defaultValue={formValues.preciolomito}
                                onChange={(e) => handleChangeInput("preciolomito", e.target.value)}
                                disable={pedido?.pedido?.numeroPedido || pedido?.pedido?.nombre ? true : false}
                            />
                        </Grid>
                        <Grid item xs={12} sm={1.3}>
                            <Form.Input
                                label='Hamburguesa'
                                name='hamburguesa'
                                placeholder="hamburguesa"
                                type="number"
                                defaultValue={formValues.hamburguesa}
                                disable={pedido?.pedido?.numeroPedido || pedido?.pedido?.nombre ? true : false}
                                onChange={(e) => handleChangeInput1("hamburguesa", e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3.4}>
                            <Form.Input
                                label='Detalle Hamburguesa'
                                name='detallehamburguesa'
                                placeholder="deTalle hamburguesa"
                                type="text"
                                defaultValue={formValues.detallehamburguesa}
                                disable={pedido?.pedido?.numeroPedido || pedido?.pedido?.nombre ? true : false}
                            />
                        </Grid>
                        <Grid item xs={12} sm={1.3}>
                            <Form.Input
                                label='Precio hambur'
                                name='preciohamburguesa'
                                placeholder="preciohamburguesa"
                                type="number"
                                defaultValue={formValues.preciohamburguesa}
                                onChange={(e) => handleChangeInput("preciohamburguesa", e.target.value)}
                                disable={pedido?.pedido?.numeroPedido || pedido?.pedido?.nombre ? true : false}
                            />
                        </Grid>
                        <Grid item xs={12} sm={1.3}>
                            <Form.Input
                                label='pancho'
                                name='pancho'
                                placeholder="pancho"
                                type="number"
                                defaultValue={isNaN(Number(formValues.pancho)) ? "" : formValues.pancho}
                                disable={pedido?.pedido?.numeroPedido || pedido?.pedido?.nombre ? true : false}
                                onChange={(e) => handleChangeInput1("pancho", e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3.4}>
                            <Form.Input
                                label='detalle pancho'
                                name='detallepancho'
                                placeholder="detalle pancho"
                                type="text"
                                defaultValue={formValues.detallepancho}
                                disable={pedido?.pedido?.numeroPedido || pedido?.pedido?.nombre ? true : false}
                            />
                        </Grid>
                        <Grid item xs={12} sm={1.3}>
                            <Form.Input
                                label='Precio pancho'
                                name='preciopancho'
                                placeholder="precio pancho"
                                type="text"
                                defaultValue={isNaN(Number(formValues.preciopancho)) ? "" : formValues.preciopancho}
                                onChange={(e) => handleChangeInput("preciopancho", e.target.value)}
                                disable={pedido?.pedido?.numeroPedido || pedido?.pedido?.nombre ? true : false}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems={"center"}>
                        <Grid item xs={6} container justifyContent={"flex-start"}                 >
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
                                    let ruta = pedido?.pedido?.numeroPedido || pedido?.pedido?.nombre ? "/bandejaPedidos" : "/home";
                                    console.log("RUTA ", ruta)
                                    if (pedido?.pedido?.numeroPedido || pedido?.pedido?.nombre) {
                                        router.replace(ruta)
                                        window.location.reload();
                                    } else {
                                        router.push(ruta)
                                    }
                                }}
                            >
                                Volver
                            </Button>


                        </Grid>
                        <Grid item xs={6} container justifyContent="flex-end">
                            <Form.SubmitButton
                                buttonText={pedido?.pedido?.numeroPedido || pedido?.pedido?.nombre ? 'Detalle pedido' : 'crear un pedido'}
                                isLoading={isLoading}
                                active={pedido?.pedido?.numeroPedido || pedido?.pedido?.nombre ? true : false}

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
            <MiDialog2
                open={dialogoStock.open}
                title={
                    dialogoStock.title
                }
                message={dialogoStock.message}
                actions={[
                    {
                        text: "Aceptar",
                        color: "primary",
                        variant: "contained",
                        onClick: () => {
                            setDialogoStock({
                                open: false,
                                title: "",
                                message: '',
                            })
                            setShowModal(true);
                        },
                    },
                ]}
            />
        </>
    )

}