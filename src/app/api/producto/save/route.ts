import { connectMongoDB } from "@/libs/mongodb";
import Producto, { IProductoSchema } from "@/models/producto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    await connectMongoDB();
    const body = await request.json();
    let { pizza, empanada, pizzam, empanadam, empanadau, cono, lomito, hamburguesa, fechaProducto, pancho } = body;
    pizza = pizza ? +pizza : 0;
    empanada = empanada ? +empanada : 0;
    empanadam = empanadam ? +empanadam : 0;
    pizzam = pizzam ? +pizzam : 0;
    empanadau = empanadau ? +empanadau : 0;
    cono = cono ? +cono : 0;
    lomito = lomito ? +lomito : 0;
    hamburguesa = hamburguesa ? +hamburguesa : 0;
    pancho = pancho ? +pancho : 0;
    const newProducto: IProductoSchema = new Producto({
        pizza, empanada, empanadam, pizzam, empanadau, cono, lomito, hamburguesa, fechaProducto, pancho
    })
    try {
        await newProducto.save();
        return NextResponse.json(
            {
                message: 'Precio de producto registrado exitosamente'
            },
            {
                status: 200
            }
        )
    } catch (error) {
        console.error('Error al registrar precio:', error);
        return NextResponse.json({ message: 'Error al registrar precio:' }, { status: 500 });
    }
}