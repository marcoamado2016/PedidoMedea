import { connectMongoDB } from "@/libs/mongodb";
import Producto from "@/models/producto";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectMongoDB();
        //const fechaActual: string = new Date(new Date().getTime() - 3 * 60 * 60 * 1000).toISOString().split('T')[0];
        const precios = await Producto.find({});
        return NextResponse.json(
            { productoPrecio: precios }, { status: 200 }
        )
    } catch (error) {
        return NextResponse.json({ message: 'Error al buscar los precios' }, { status: 500 });
    }
}