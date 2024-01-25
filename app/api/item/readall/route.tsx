import connectDB from "@/app/utils/database"
import { ItemModel } from "@/app/utils/schemaModels"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        await connectDB()
        const allItems = await ItemModel.find()
        return NextResponse.json({ message: "アイテム読み取り(オール)成功", allItems })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "アイテム読み取り(オール)失敗" }, { status: 500 })
    }
}