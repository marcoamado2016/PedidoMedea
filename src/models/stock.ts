
import mongoose, { ObjectId, Schema,Document } from "mongoose";

export interface IStock {
    _id?: ObjectId | string | undefined;
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
export interface IStockSchema extends Document {
    _id?: ObjectId | string | undefined;
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
const stockSchema = new Schema(
    {
        fechastock: {
            type: String
        },
        stockhamburguesa: {
            type: String
        },
        stockpancho: {
            type: String
        },
        stockpizza: {
            type: String
        },
        stockempanada: {
            type: String
        },
        stockcono: {
            type: String
        },
        stocklomito: {
            type: String
        },
        stockhamburguesaActual: {
            type: String
        },
        stockpanchoActual: {
            type: String
        },
        stockpizzaActual: {
            type: String
        },
        stockempanadaActual: {
            type: String
        },
        stockconoActual: {
            type: String
        },
        stocklomitoActual: {
            type: String
        }
    },
    {
        versionKey: false,
        timestamps: true
    })
const Stock = mongoose.models.Stock || mongoose.model("Stock", stockSchema)
export default Stock;