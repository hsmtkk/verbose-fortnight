import connectDB from "@/app/utils/database"
import { ItemModel } from "@/app/utils/schemaModels"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id
    try {
        await connectDB()
        const singleItem = await ItemModel.findById(id)
        return NextResponse.json({ message: "アイテム読み取り(シングル)成功", singleItem })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "アイテム読み取り(シングル)失敗" }, { status: 500 })
    }
}