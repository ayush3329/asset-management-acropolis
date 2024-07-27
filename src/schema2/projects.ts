import mongoose from "mongoose";


const RequiredAsset = new mongoose.Schema({
    
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "physical" || "digital",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
    
})

const required_asset  = mongoose.model("required_asset", RequiredAsset);


const Projects = new mongoose.Schema({
    departmentID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "department" 
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startedAt: {
        type: Date,
        default: Date.now()
    },
    requirement: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "required_asset",
        required: true
    }],
    status: {
        type: Number,
        default: 0,
        max: 100,
    }

})

const project = mongoose.model("project", Projects);