import { connectMongoDB } from "@/libs/mongodb";
import Pedido, { IPedidoSchema } from "@/models/pedido";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    await connectMongoDB();
    let pedidoBuscado: any;
    const body = await request.json()

    let { numeroPedido, detalle, fechaPedido, estado, nombre, lomito, empanada, pizza, cono, hamburguesa, pancho, detalleempanada, detallepizza, detallelomo, detallecono, detallehamburguesa, detallepancho } = body;
    nombre = nombre ? String(nombre).toUpperCase() : "";
    detalle = detalle ? String(detalle).toUpperCase() : "";
    lomito = lomito ? +lomito : 0;
    pancho = pancho ? +pancho : 0;
    empanada = empanada ? +empanada : 0;
    numeroPedido = numeroPedido ? +numeroPedido : 0;
    pizza = pizza ? +pizza : 0;
    hamburguesa = hamburguesa ? +hamburguesa : 0;
    cono = cono ? +cono : 0;
    detalleempanada = String(detalleempanada).toUpperCase();
    detallepizza = String(detallepizza).toUpperCase();
    detallelomo = String(detallelomo).toUpperCase();
    detallecono = String(detallecono).toUpperCase();
    detallehamburguesa = String(detallehamburguesa).toUpperCase();
    detallepancho = String(detallepancho).toUpperCase();

    if (lomito == 0 && pancho == 0 && empanada == 0 && pizza == 0 && hamburguesa == 0 && cono == 0) {
        return NextResponse.json(
            { message: 'Todos los campos son obligatorios' }, { status: 400 }
        )
    }
      console.log("nombre ",nombre," numeroPedido ",numeroPedido)
    if (nombre == "" && numeroPedido == 0) {
        return NextResponse.json(
            { message: 'Debe ingresar el nombre o número del pedido.' }, { status: 401 }
        )
    }

    if ((lomito == 0 && detallelomo !== "") || (pancho == 0 && detallepancho !== "") || (empanada == 0 && detalleempanada !== "") || (pizza == 0 && detallepizza !== "") || (hamburguesa == 0 && detallehamburguesa !== "") || (cono == 0 && detallecono !== "")) {
        return NextResponse.json(
            { message: 'No se puede cargar un detalle, sin la cantidad' }, { status: 402 }
        )
    }

    if (numeroPedido) {
        pedidoBuscado = await Pedido.findOne({ numeroPedido: numeroPedido })
        if (pedidoBuscado) {
            return NextResponse.json(
                {
                    message: 'Pedio ya existe'
                },
                {
                    status: 409
                }
            )
        }
    }
    const newPedido: IPedidoSchema = new Pedido({
        numeroPedido, detalle, fechaPedido, estado, nombre, empanada, lomito, pizza, cono, hamburguesa, pancho, detalleempanada, detallepizza, detallelomo, detallecono, detallehamburguesa, detallepancho
    })
    try {
        await newPedido.save();
        return NextResponse.json(
            {
                message: 'Pedio creado exitosamente'
            },
            {
                status: 200
            })

    } catch (error) {
        console.error('Error al guardar el pedido:', error);
        return NextResponse.json({ message: 'Error al guardar el pedido' }, { status: 500 });
    }

}