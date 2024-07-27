import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cloudinary from "cloudinary";
require("dotenv").config();


dotenv.config();

const URL:string = process.env.DBURL || '';

export async function dbConnect() {
    mongoose.connect(URL,{
        serverSelectionTimeoutMS: 5000
    }).then(()=>{
        console.log("Sucessfully connected with db");
    }).catch((e:Error)=>{
        console.log("Unable to connect with db");
        console.log(e);
    })
}

// export async function cloudinaryConnect(){
//     try{
//         await cloudinary.v2.config({
//             cloud_name:process.env.CLOUD_NAME,
//             api_key: process.env.API_KEY,
//             api_secret: process.env.API_SECRET,
//         })
//         console.log("Successfully connected with cloudinary")
// }
// catch(error) {
//     console.log(error);
// }
// }