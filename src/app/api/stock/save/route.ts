import { connectMongoDB } from "@/libs/mongodb";
import Stock, { IStockSchema } from "@/models/stock";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await connectMongoDB();
    const body = await request.json();
    const {
        fechastock, stockhamburguesa,
        stockpancho, stockpizza, stockempanada, stockcono, stocklomito,
        stockhamburguesaActual, stockpanchoActual, stockpizzaActual,
        stockempanadaActual, stockconoActual, stocklomitoActual
    } = body;

    const newStock: IStockSchema = new Stock({
        fechastock, stockhamburguesa,
        stockpancho, stockpizza, stockempanada, stockcono, stocklomito,
        stockhamburguesaActual, stockpanchoActual, stockpizzaActual,
        stockempanadaActual, stockconoActual, stocklomitoActual
    })
    try {
        await newStock.save();
        return NextResponse.json({ message: 'ok al registrar stock' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'Error al registrar stock' }, { status: 500 })
    }

}