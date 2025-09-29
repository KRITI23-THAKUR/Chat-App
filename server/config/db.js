import mongoose from "mongoose";

export const connectdb=async()=>{

   try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("database is connected successfully")
    
   }
    catch (error) {
        console.log("database connection failed")
        process.exit(1);
    
   }
}