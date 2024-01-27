import connectDB from "@/app/utils/database"
import { UserModel } from "@/app/utils/schemaModels"
import { NextRequest, NextResponse } from "next/server"
import { SignJWT } from "jose"

export async function POST(req: NextRequest) {
    const reqJson = await req.json()
    try {
        await connectDB()
        const savedUserData = await UserModel.findOne({ email: reqJson.email })
        if (savedUserData) {
            if (reqJson.password === savedUserData.password) {
                const secretKey = process.env.SECRET_KEY
                const encodedKey = new TextEncoder().encode(secretKey)
                const payload = { email: reqJson.email }
                const token = await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setExpirationTime("1d").sign(encodedKey)
                return NextResponse.json({ message: "ログイン成功", token })
            } else {
                return NextResponse.json({ message: "ログイン失敗: パスワード誤り" }, { status: 401 })
            }
        } else {
            return NextResponse.json({ message: "ログイン失敗: ユーザー登録なし" }, { status: 401 })
        }
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "ログイン失敗" }, { status: 500 })
    }
}