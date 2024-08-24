import { connectMongoDB } from "@/libs/mongodb";
import Pedido from "@/models/pedido";
import { NextResponse } from "next/server";


export async function GET() {
    await connectMongoDB();

    try {

        let numeroSiguiente: number = 0;
        let ultimoPedido = await Pedido.findOne().sort({ numeroPedido: -1 });
        numeroSiguiente = ultimoPedido ? ultimoPedido.numeroPedido + 1 : 1;
        return NextResponse.json(
            {
                numeroSiguiente:numeroSiguiente
            },
            {
                status: 200
            }
        )
    } catch (error) {
        return NextResponse.json({ message: 'Error al obtener el siguiente numero de pedido' }, { status: 500 });
    }

}

