import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
//mongoose.connect(process.env.MONGO_URL.replace(/['"]+/g, ''))
mongoose.connect(process.env.MONGO_URL)

.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log("MongoDB connection error:", err.message));