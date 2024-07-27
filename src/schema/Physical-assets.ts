import mongoose from "mongoose";

const Physical = new mongoose.Schema({
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
    pic: {
        type: String,
        required: true
    }, 
    idle: {
        type: Boolean,
        required: true,
        default: true
    }, 
    assignedToDept: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "department",   
        default: `$departmentId`
    }
});



export const physical = mongoose.model("physical", Physical);