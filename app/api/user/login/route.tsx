import connectDB from "@/app/utils/database"
import { UserModel } from "@/app/utils/schemaModels"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const reqJson = await req.json()
    try {
        await connectDB()
        const savedUserData = await UserModel.findOne({ email: reqJson.email })
        if (savedUserData) {
            if (reqJson.password === savedUserData.password) {
                return NextResponse.json({ message: "ログイン成功" })
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