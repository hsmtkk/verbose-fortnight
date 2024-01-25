import connectDB from "@/app/utils/database"
import { ItemModel } from "@/app/utils/schemaModels"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id
    const reqJson = await req.json()
    try {
        await connectDB()
        await ItemModel.updateOne({ _id: id }, reqJson)
        return NextResponse.json({ message: "アイテム編集成功" })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "アイテム編集失敗" }, { status: 500 })
    }
}