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
        default: ""
    }, 
    idle: {
        type: Boolean,
        required: true,
        default: true
    }, 
    assignedToDept: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "department",   
        required: "true"
    }
});



export const physical = mongoose.model("physical", Physical);