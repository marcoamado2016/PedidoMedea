import mongoose from "mongoose"

const MONGO_URL = process.env.MONGO_LOCAL

export const connectMongoDB = async () => {
    try {
        if (MONGO_URL) await mongoose.connect(MONGO_URL)
        console.log("conectado a mongo")

    } catch (error) {
        console.log(error)
    }
}
