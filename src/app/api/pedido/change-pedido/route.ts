import { connectMongoDB } from "@/libs/mongodb";
import Pedido from "@/models/pedido";
import messages from "@/utils/message";
import { NextRequest, NextResponse } from "next/server";

export interface PropsPedido {
    numeroPedido?: number;
    detalle?: string;
    fechaPedido?: string;
    estado?: string;
    nombre?: string;
    empanada?: number;
    pizza?: number;
    lomito?: number;
    cono?: number;
    hambuerguesa?: number;
    tiempoListo?: string
}

export async function POST(request: NextRequest) {
    try {
        await connectMongoDB();
        const body: PropsPedido = await request.json();
        const { numeroPedido, detalle, fechaPedido, estado, nombre, empanada, pizza, lomito, cono, hambuerguesa, tiempoListo } = body;
        console.log("body ", body)

        if (!numeroPedido && !nombre) {
            return NextResponse.json(
                { messages: 'Debe ingresar un numero de pedido' }, { status: 400 }
            )
        }
        let pedidoEncontrado;
        if (numeroPedido) {
            pedidoEncontrado = await Pedido.findOne({ numeroPedido: numeroPedido })
        }
        if (nombre) {
            pedidoEncontrado = await Pedido.findOne({ nombre: nombre });
        }

        if (!pedidoEncontrado) {
            return NextResponse.json(
                { messages: 'No se encontro ningun pedido' }, { status: 404 }
            )
        }

        if (pedidoEncontrado) {
            console.log("pedidoEncontrado ", pedidoEncontrado)
            pedidoEncontrado.detalle = detalle ? detalle : pedidoEncontrado.detalle;
            pedidoEncontrado.fechaPedido = fechaPedido ? fechaPedido : pedidoEncontrado.fechaPedido;
            pedidoEncontrado.estado = estado ? estado : pedidoEncontrado.estado;
            pedidoEncontrado.nombre = nombre ? nombre : pedidoEncontrado.nombre;
            pedidoEncontrado.empanada = empanada ? empanada : pedidoEncontrado.empanada;
            pedidoEncontrado.pizza = pizza ? pizza : pedidoEncontrado.pizza;
            pedidoEncontrado.lomito = lomito ? lomito : pedidoEncontrado.lomito;
            pedidoEncontrado.cono = cono ? cono : pedidoEncontrado.cono;
            pedidoEncontrado.hambuerguesa = hambuerguesa ? hambuerguesa : pedidoEncontrado.hambuerguesa;
            pedidoEncontrado.hambuerguesa = tiempoListo ? tiempoListo : pedidoEncontrado.tiempoListo;
            pedidoEncontrado.save();
        }

        return NextResponse.json(
            { pedidoModificado: pedidoEncontrado, messages: 'Pedido modificado' }, { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: messages.error.errorDefault }, { status: 500 }
        )
    }
}