import { connectMongoDB } from "@/libs/mongodb";
import Stock from "@/models/stock";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectMongoDB();
        //const fechaActual: string = new Date(new Date().getTime() - 3 * 60 * 60 * 1000).toISOString().split('T')[0];
        const stock = await Stock.find({});
        return NextResponse.json(
            { stock: stock },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json({ message: 'Error al buscar el stock' }, { status: 500 });
    }
}