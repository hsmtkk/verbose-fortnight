import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const mongoURL: string = process.env.MONGO_URL!
        await mongoose.connect(mongoURL)
        console.log("connected MongoDB")
    } catch (err) {
        console.log("failed to connect MongoDB")
        console.log(err)
    }
}

export default connectDB
