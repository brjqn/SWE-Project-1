import mongoose from "mongoose";

//This file is to connect to database using the string from MongoDB
export const connectDB = async () => {
    try {
        //connection process
        const conn = await mongoose.connect(process.env.MONGO_URI);

        //print statement 
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        //error handling
        console.error("Error connecting to MongoDB:", error.message);
    }
};

//connect with callback funciton