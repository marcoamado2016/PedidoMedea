import Stock from "@/models/stock";
import { NextRequest, NextResponse } from "next/server";

export interface PropsStock {
    fechastock?: string;
    stockhamburguesa?: string;
    stockpancho?: string;
    stockpizza?: string;
    stockempanada?: string;
    stockcono?: string;
    stocklomito?: string;
    stockhamburguesaActual?: string;
    stockpanchoActual?: string;
    stockpizzaActual?: string;
    stockempanadaActual?: string;
    stockconoActual?: string;
    stocklomitoActual?: string;
}
export async function POST(request: NextRequest) {
    try {
        const body: PropsStock = await request.json();
        const { fechastock, stockcono, stockconoActual, stockempanada, stockempanadaActual,
            stockhamburguesa, stockhamburguesaActual, stocklomito, stocklomitoActual, stockpancho,
            stockpanchoActual, stockpizza, stockpizzaActual } = body;
        const stockActual = await Stock.findOne({ fechastock: fechastock });
        if (stockActual) {
            stockActual.stockcono = stockcono ? stockcono : stockActual.stockcono;
            stockActual.stockconoActual = stockconoActual ? stockconoActual : stockActual.stockconoActual;
            stockActual.stockempanada = stockempanada ? stockempanada : stockActual.stockempanada;
            stockActual.stockempanadaActual = stockempanadaActual ? stockempanadaActual : stockActual.stockempanadaActual;
            stockActual.stockhamburguesa = stockhamburguesa ? stockhamburguesa : stockActual.stockhamburguesa;
            stockActual.stockhamburguesaActual = stockhamburguesaActual ? stockhamburguesaActual : stockActual.stockhamburguesaActual;
            stockActual.stocklomito = stocklomito ? stocklomito : stockActual.stocklomito;
            stockActual.stocklomitoActual = stocklomitoActual ? stocklomitoActual : stockActual.stocklomitoActual;
            stockActual.stockpancho = stockpancho ? stockpancho : stockActual.stockpancho;
            stockActual.stockpanchoActual = stockpanchoActual ? stockpanchoActual : stockActual.stockpanchoActual;
            stockActual.stockpizza = stockpizza ? stockpizza : stockActual.stockpizza;
            stockActual.stockpizzaActual = stockpizzaActual ? stockpizzaActual : stockActual.stockpizzaActual;
            await stockActual.save();
        }
        return NextResponse.json(
            { message: 'Stock modificado ok' },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: 'Error al modificar el Producto' }, { status: 500 }
        )
    }
}