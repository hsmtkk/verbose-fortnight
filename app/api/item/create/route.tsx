import connectDB from "@/app/utils/database"
import { ItemModel } from "@/app/utils/schemaModels"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    try {
        const reqJson = await req.json()
        await connectDB()
        const allItems = ItemModel.create(reqJson)
        return NextResponse.json({ message: "アイテム作成成功" })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "アイテム作成失敗" }, { status: 500 })
    }
}