import mongoose from "mongoose";

const Digital = new mongoose.Schema({
    type: {
        type: String,
        enum: ["video", "image", "files"],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "department",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true
    },
    url: {
        type: String,
        required: true
    }, 
    
})



export const digital = mongoose.model("digital", Digital);