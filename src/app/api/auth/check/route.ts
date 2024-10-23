
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import messages from "@/utils/message";
import User from "@/models/User";
export async function GET(request: NextRequest) {
    try {
        const headersList = headers()
        const token = headersList.get("token")
        if (!token) {
            return NextResponse.json(

                { message: "No existe token" },
                { status: 500 }
            )
        }
        try {
            const validarUsuarioToken = jwt.verify(token, 'secreto')
            //@ts-ignore
            const { data } = validarUsuarioToken
            const usuarioFind = await User.findById(data.userId);
            if (!usuarioFind) {
                return NextResponse.json(
                    { message: messages.error.NotfoundUser },
                    { status: 404 }
                )
            }
        } catch (error) {
            return NextResponse.json(
                { message: messages.error.NoAutorizado },
                { status: 403 }
            )
        }
    } catch (error) {
        return NextResponse.json(
            { message: messages.error.NoAutorizado },
            { status: 403 }
        )
    }



}