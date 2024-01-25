import connectDB from "@/app/utils/database"
import { ItemModel } from "@/app/utils/schemaModels"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id
    try {
        await connectDB()
        await ItemModel.deleteOne({ _id: id })
        return NextResponse.json({ message: "アイテム削除成功" })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "アイテム削除失敗" }, { status: 500 })
    }
}