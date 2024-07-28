import mongoose from "mongoose";

const Department = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    total_asset: {
        type: Number,
        required: true,
        default: 0
    },
    typeofasset: [{
        type: String, //truck, bus, driller, bus
        unique: true,
    }],
    asset: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "asset",
        required: true
    }],
    projectId: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "project"
    }],
    Members: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "department_user"
    }]
})

export const department = mongoose.model('department', Department);
