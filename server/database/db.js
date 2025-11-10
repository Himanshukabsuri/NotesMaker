import mongoose from 'mongoose'

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: "random"
        })
        console.log("Connected");

    } catch (error) {
        console.error("❌ Database Connection Failed:", error.message)
        process.exit(1);
    }
}

export default connectDb