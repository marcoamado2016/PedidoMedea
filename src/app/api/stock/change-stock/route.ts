import Stock, { IStockSchema } from "@/models/stock";
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
        let { fechastock, stockcono, stockconoActual, stockempanada, stockempanadaActual,
            stockhamburguesa, stockhamburguesaActual, stocklomito, stocklomitoActual, stockpancho,
            stockpanchoActual, stockpizza, stockpizzaActual } = body;
        const stockActual = await Stock.findOne({});
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
            stockActual.fechastock = fechastock;
            await stockActual.save();
        } else {
            stockcono = stockcono ? stockcono : '0';
            stockconoActual = stockconoActual ? stockconoActual : '0';
            stockempanada = stockempanada ? stockempanada : '0';
            stockempanadaActual = stockempanadaActual ? stockempanadaActual : '0';
            stockhamburguesa = stockhamburguesa ? stockhamburguesa : '0';
            stockhamburguesaActual = stockhamburguesaActual ? stockhamburguesaActual : '0';
            stocklomito = stocklomito ? stocklomito : '0';
            stocklomitoActual = stocklomitoActual ? stocklomitoActual : '0';
            stockpancho = stockpancho ? stockpancho : '0';
            stockpanchoActual = stockpanchoActual ? stockpanchoActual : '0';
            stockpizza = stockpizza ? stockpizza : '0';
            stockpizzaActual = stockpizzaActual ? stockpizzaActual : '0';

            let newStockActual: IStockSchema = new Stock({
                stockcono, stockconoActual, stockempanada, stockempanadaActual, stockhamburguesa, stockhamburguesaActual,
                stocklomito, stocklomitoActual, stockpancho, stockpanchoActual, stockpizza, stockpizzaActual, fechastock
            })
            await newStockActual.save();
        }
        return NextResponse.json(
            { message: 'Stock modificado ok' },
            { status: 200 }
        )
    } catch (error) {
        console.log("MODIFICAR ", error)
        return NextResponse.json(
            { message: 'Error al modificar el Producto' }, { status: 500 }
        )
    }
}