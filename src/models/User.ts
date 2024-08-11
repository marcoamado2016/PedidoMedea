import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface Iuser {
    _id?: ObjectId | string | undefined;
    email: string;
    password: string;
    createdAt?: string;
    updateAt?: string;
}

export interface IUserSchema extends Document {
    _id?: ObjectId | string | undefined;
    email: string;
    password: string;
    createdAt?: string;
    updateAt?: string;
}

const UserSchenma = new Schema(
    {
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }

)

const User = mongoose.models.User || mongoose.model("User", UserSchenma);
export default User;