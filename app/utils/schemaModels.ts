import mongoose from "mongoose"

const Schema = mongoose.Schema

const ItemSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    email: String,
})

export const ItemModel = mongoose.models.Items || mongoose.model("Item", ItemSchema)
