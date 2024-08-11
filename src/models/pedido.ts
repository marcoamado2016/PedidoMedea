import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IPedido {
    _id?: ObjectId | string | undefined;
    fechaPedido?: string;
    detalle?: string;
    numeroPedido?: string | number;
    estado?: string;
    nombre?: string;
    empanada?: number;
    pizza?: number;
    lomito?: number;
    cono?: number;
    hamburguesa?: number;
    pancho?: number;
    detalleempanada?: string;
    detallepizza?: string;
    detallelomo?: string;
    detallecono?: string;
    detallehamburguesa?: string;
    detallepancho?: string;

}

export interface IPedidoSchema extends Document {
    _id?: ObjectId | string | undefined;
    fechaPedido?: string;
    detalle?: string;
    numeroPedido?: string | number;
    estado?: string;
    nombre?: string;
    empanada?: number;
    pizza?: number;
    lomito?: number;
    cono?: number;
    hamburguesa?: number;
    pancho?: number;
    detalleempanada?: string;
    detallepizza?: string;
    detallelomo?: string;
    detallecono?: string;
    detallehamburguesa?: string;
    detallepancho?: string;
}
const pedidoSchema = new Schema(
    {
        numeroPedido: {
            type: Number,
        },
        detalle: {
            type: String,

        },
        fechaPedido: {
            type: String,
            required: true
        },
        estado: {
            type: String,
        },
        nombre: {
            type: String,
        },
        empanada: {
            type: Number,
        },
        pizza: {
            type: Number,
        },
        lomito: {
            type: Number,
        },
        cono: {
            type: Number,
        },
        hamburguesa: {
            type: Number,
        },
        pancho: {
            type: Number
        },
        detalleempanada: {
            type: String
        },
        detallepizza: { type: String },
        detallelomo: { type: String },
        detallecono: { type: String },
        detallehamburguesa: { type: String },
        detallepancho: { type: String }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const Pedido = mongoose.models.Pedido || mongoose.model("Pedido", pedidoSchema)
export default Pedido;