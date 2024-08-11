import { connectMongoDB } from "@/libs/mongodb";
import User from "@/models/User";
import messages from "@/utils/message";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend("re_VuQ8a4hG_NjURidvq72w7Pv8K9AdBAdHk")
export async function POST(request: NextRequest) {
    const body: { email: string } = await request.json();
    const { email } = body;
    try {
        if (!email) {
            return NextResponse.json(
                { message: messages.error.needdProps },
                { status: 400 }
            )
        }
        await connectMongoDB();
        const userFind = await User.findOne({ email })
        if (!userFind) {
            return NextResponse.json(
                { message: messages.error.NoUserEmail },
                { status: 404 }
            )
        }
        const tokenData: { email: string, userId: string } = {
            email: userFind.email,
            userId: userFind._id
        }

        const token = jwt.sign({ data: tokenData }, 'secreto', {
            expiresIn: 86400
        })

        const url = `http://localhost:3000/change-password?token=${token}`;

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Se solicita el cambio de contraseña',
            html: `<a href=${url}>Cambiar contraseña</a>`
        })

        return NextResponse.json({
            messge: messages.success.sendEmail
        },
            { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { message: messages.error.errorDefault },
            { status: 500 }
        )
    }
}