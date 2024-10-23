import { connectMongoDB } from "@/libs/mongodb";
import Pedido from "@/models/pedido";
import { NextResponse } from "next/server";

export async function GET() {
    await connectMongoDB();
    try {
        const todosLosPedidos = await Pedido.find({});
        return NextResponse.json({ pedidos: todosLosPedidos }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'Error al buscar los pedidos' }, { status: 500 });
    }

}