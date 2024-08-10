import mongoose from "mongoose";

export default async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            // No additional options needed for basic connection
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
