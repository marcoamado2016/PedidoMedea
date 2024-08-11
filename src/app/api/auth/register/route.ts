import { connectMongoDB } from "@/libs/mongodb";
import User, { IUserSchema } from "@/models/User";
import { isValidEmail } from "@/utils/isValidEmail";
import { messages } from "@/utils/message";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export async function POST(request: NextRequest) {
    try {
        await connectMongoDB()
        const body = await request.json()
        console.log("body ", body)
        const { email, password, confirmPassword } = body
        //validar los parametros enviados
        if (!email || !password || !confirmPassword) {
            return NextResponse.json({
                message: messages.error.needdProps,

            }, {
                status: 400
            }
            )
        }

        //validar si es un email

        if (!isValidEmail(email)) {
            return NextResponse.json({
                message: messages.error.isMail
            }, {
                status: 400
            })
        }

        if (password !== confirmPassword) {
            return NextResponse.json(
                {
                    message: messages.error.validPassword
                },
                {
                    status: 400
                }
            )
        }

        const userFind = await User.findOne({ email })

        if (userFind) {
            return NextResponse.json(
                {
                    messages: messages.error.emailExiste
                },
                {
                    status: 400
                }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser: IUserSchema = new User({
            email,
            password: hashedPassword
        })

        const { password: userPassword, ...rest } = newUser;

        await newUser.save()

        const token = jwt.sign({ data: rest }, 'secreto', {
            expiresIn: 86400
        })

        const response = NextResponse.json(

            {
                newUser: rest,
                message: messages.success.userCreated
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
        return NextResponse.json(
            { message: messages.error.errorDefault },
            { status: 500 }
        );
    }
}