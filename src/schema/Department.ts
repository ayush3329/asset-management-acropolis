import mongoose from "mongoose";

const Department = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
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
    physical_asset: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "physical",
        required: true
    }],
    digital_asset: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "digital",
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
