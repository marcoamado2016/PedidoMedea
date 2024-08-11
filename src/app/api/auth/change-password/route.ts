import { connectMongoDB } from "@/libs/mongodb";
import messages from "@/utils/message";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { headers } from "next/headers"
export interface propsI {
    password: string;
    confirmPassword: string;
    email: string;
}
export async function POST(request: NextRequest) {
    try {
        await connectMongoDB();
        const body: propsI = await request.json();
        const { confirmPassword, password, email } = body;
        if (!confirmPassword || !password || !email) {
            return NextResponse.json({
                message: messages.error.needdProps
            },
                { status: 400 }
            )

        }
        if (confirmPassword != password) {
            return NextResponse.json(
                { message: messages.error.errorPasswordConfirm },
                { status: 400 }
            )
        }
        const passwordHashed = await bcrypt.hash(password, 10)
        const headersList = headers()
        const token= headersList.get("token")
        
        
        if (!token) {
            return NextResponse.json(
                { message: "No esta autorizado" },
                { status: 403 }
            )
        }
/*
        let token:string="";
       if(token1){
        let cookie=token1.split(";")
        cookie.forEach((c)=>{
           token= c.trim().split("=")[1]
        })
       }
       */
      
       const isValidTokend = jwt.verify(token, 'secreto')
    
        //@ts-ignore
        const {data}=isValidTokend
       
        const userFind = await User.findById(data.userId)
        if (!userFind) {
            return NextResponse.json(
                { message: messages.error.NotfoundUser },
                { status: 400 }
            )
        }
        userFind.password = passwordHashed;
        userFind.save();
        if (!passwordHashed) {
            return NextResponse.json(
                { message: "No se pudo encriptar la contraseña" },
                { status: 400 }
            )
        }
        return NextResponse.json(
            { message: messages.success.changePassword },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: messages.error.errorDefault },
            { status: 500 }
        )
    }
}