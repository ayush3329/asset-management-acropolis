import mongoose from "mongoose";

const public_user = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    aadhar: {
        type: String,
        required: true,
        min: [16, "Enter a valid aadhar No, not less than 16 digit"],
        max: [16, "Enter a valid aadhar No, not greater than 16 digit"]
    },
    issue_raised: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "issue_raised",
    }]
})

export const Puser = mongoose.model('public_user', public_user);
