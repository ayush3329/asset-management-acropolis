import express from "express"
import { department } from "../schema/Department";
import { physical } from "../schema/Physical-assets";
import { digital } from "../schema/Digital-assets";
import { user } from "../schema/User";

const data = [
    {
        "username": "ankit090",
        "password": "123",
        "email": "anki090@gmail.com",
        "fullname": "Ankit Pudir",
        "designation": "HOD",
        "department": "66a479ec37738d8a4ac9b2ca",
    },
    {
        "username": "ajay2",
        "password": "123",
        "email": "ajay@gmai.com",
        "fullname": "Ajay Kumar",
        "designation": "collector",
        "department": "66a479eb37738d8a4ac9b2c4",
    },
    {
        "username": "rajesh3",
        "password": "123",
        "email": "rajesh3@gmail.com",
        "fullname": "Rajesh kumar",
        "designation": "manager",
        "department": "66a479ec37738d8a4ac9b2ca",
    },
    {
        "username": "john4",
        "password": "123",
        "email": "john4@gmail.com",
        "fullname": "John Doe",
        "designation": "Engineer",
        "department": "66a479ed37738d8a4ac9b2cb",
    },
];


const router = express.Router();

router.post("/test", async(req, res)=>{    
    for(let i = 0; i<data.length; i++){
        const response = await user.create(data[i]);
        console.log(response);
    }

    res.send(200);

})

export default router;