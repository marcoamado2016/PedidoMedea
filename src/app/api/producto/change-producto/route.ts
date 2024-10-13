import Producto from "@/models/producto";
import { NextRequest, NextResponse } from "next/server";
export interface PropsProucto {
    pizza: string;
    empanada: string;
    empanadam: string;
    pizzam: string;
    empanadau: string;
    cono: string;
    lomito: string;
    hamburguesa: string;
    pancho: string;
    fechaProducto: string;
}
export async function POST(request: NextRequest) {
    try {
        const body: PropsProucto = await request.json();
        const { cono, empanada, empanadam, empanadau, hamburguesa, pancho, lomito, pizza, pizzam, fechaProducto } = body;
        console.log("body ",body)
        const productoActual = await Producto.findOne({ fechaProducto: fechaProducto });
        console.log("productoActual ",productoActual)
        if (productoActual) {
            productoActual.pizza = pizza ? pizza : productoActual.pizza;
            productoActual.empanada = empanada ? empanada : productoActual.empanada;
            productoActual.empanadam = empanadam ? empanadam : productoActual.empanadam;
            productoActual.pizzam = pizzam ? pizzam : productoActual.pizzam;
            productoActual.empanadau = empanadau ? empanadau : productoActual.empanadau;
            productoActual.cono = cono ? cono : productoActual.cono;
            productoActual.lomito = lomito ? lomito : productoActual.lomito;
            productoActual.hamburguesa = hamburguesa ? hamburguesa : productoActual.hamburguesa;
            productoActual.pancho = pancho ? pancho : productoActual.pancho;
            console.log("DESPUES pr productoActual ",productoActual)
            productoActual.save();
        }
        return NextResponse.json(
            { message: 'Producto modificado ok' },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: 'Error al modificar el Producto' }, { status: 500 }
        )
    }
}