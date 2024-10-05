import { connectMongoDB } from "@/libs/mongodb";
import Producto from "@/models/producto";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectMongoDB();
        const precios = await Producto.find();
        return NextResponse.json(
            { productoPrecio: precios }, { status: 200 }
        )
    } catch (error) {
        return NextResponse.json({ message: 'Error al buscar los precios' }, { status: 500 });
    }
}