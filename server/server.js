import dotenv from "dotenv";
import express from "express";
import { connectdb } from "./config/db.js";

dotenv.config();

const app=express();

connectdb();

app.get("/",(req,res)=>{
    res.send("Hello bby")

});
const PORT=process.env.PORT ||8000;
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)

})
