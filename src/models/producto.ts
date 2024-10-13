import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IProducto {
    _id?: ObjectId | string | undefined;
    pizza?: string,
    empanada?: string;
    pizzam?: string;
    empanadam?: string;
    empanadau?: string;
    cono?: string;
    lomito?: string;
    hamburguesa?: string;
    fechaProducto?: string;
    pancho?: string
}
export interface IProductoSchema extends Document {
    _id?: ObjectId | string | undefined;
    pizza?: string,
    empanada?: string;
    pizzam?: string;
    empanadam?: string;
    empanadau?: string;
    cono?: string;
    lomito?: string;
    hamburguesa?: string;
    fechaProducto?: string;
    pancho?: string
}

const productoSchema = new Schema(
    {
        pizza: {
            type: String
        },
        empanada: {
            type: String
        },
        pizzam: {
            type: String
        },
        empanadam: {
            type: String
        },
        empanadau: {
            type: String
        },
        cono: {
            type: String
        },
        lomito: {
            type: String
        },
        hamburguesa: {
            type: String
        },
        fechaProducto: {
            type: String
        },
        pancho: {
            type: String
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)
const Producto = mongoose.models.Producto || mongoose.model("Producto", productoSchema)
export default Producto;