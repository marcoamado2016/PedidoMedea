import messages from "@/utils/message";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectMongoDB } from "@/libs/mongodb";
export async function POST(request: NextRequest) {
    try {
        await connectMongoDB()
        const body = await request.json();
        const { email, password } = body
        console.log("eemail ",email)
        if (!email || !password) {
            return NextResponse.json({
                message: messages.error.needdProps
            }, {
                status: 400
            })
        }

        const userFind = await User.findOne({ email })
        console.log("userFind",userFind)
        if (!userFind) {
            return NextResponse.json({
                message: messages.error.NotfoundUser
            }, {
                status: 400
            })
        }


        const comparePassword = await bcrypt.compare(
            password,
            userFind.password,

        )

        if (!comparePassword) {
            return NextResponse.json({
                message: messages.error.errorLogin
            }, {
                status: 400
            })
        }
        const { password: userPassword, ...rest } = userFind._doc;
        const token = jwt.sign({ data: rest }, 'secreto', {
            expiresIn: 86400
        })

        const response = NextResponse.json(
            {
                userLogin: rest,
                message: messages.success.loginOk

            },
            {
                status: 200
            })

        response.cookies.set("auth_cookie", token, {
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 86400,
            path: "/"
        })

        return response;
    } catch (error) {
        return NextResponse.json({
            message: messages.error.errorLogin
        }, {
            status: 500
        })
    }
}