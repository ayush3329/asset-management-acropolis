import mongoose from "mongoose";

const Asset = new mongoose.Schema({
    type: { //truck, bulldozer, driller etc
        type: String,
        required: true
    },
    uniqueId: {
        type: String,
        required: true,
        unique: true
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
    vacant: {
        type: Boolean,
        required: true,
        default: true
    }, 
    assignedToDept: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "department",  
        default: function() {
            return this.departmentId;
        }
    }
});



export const asset = mongoose.model("asset", Asset);