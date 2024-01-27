import connectDB from "@/app/utils/database"
import { ItemModel } from "@/app/utils/schemaModels"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id
    const reqJson = await req.json()
    try {
        await connectDB()
        const singleItem = await ItemModel.findById(id)
        if (singleItem.email === reqJson.email) {
            await ItemModel.updateOne({ _id: id }, reqJson)
            return NextResponse.json({ message: "アイテム編集成功" })
        } else {
            return NextResponse.json({ message: "他人の作成したアイテム" }, { status: 401 })
        }
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "アイテム編集失敗" }, { status: 500 })
    }
}