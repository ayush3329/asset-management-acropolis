import mongoose from "mongoose";

const Issue_Raised = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    solved: {
        type: Boolean,
        default: false
    },
    verified: {
        type: Boolean,
        default: false
    },
    issue_url: {
        type: String,
        required: true
    },
    file_type: {
        type: String,
        enum: ["image", "video"],
        required: true
    }
})

export const issue_raised = mongoose.model('issue_raised', Issue_Raised);
