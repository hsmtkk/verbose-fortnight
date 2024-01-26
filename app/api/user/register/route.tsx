import connectDB from "@/app/utils/database"
import { UserModel } from "@/app/utils/schemaModels"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const reqJson = await req.json()
    try {
        await connectDB()
        await UserModel.create(reqJson)
        return NextResponse.json({ message: "ユーザー登録成功" })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "ユーザー登録失敗" }, { status: 500 })
    }
}