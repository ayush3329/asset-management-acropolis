import express from "express"
import { department } from "../schema/Department";

const data = [{
    "name": "PWD",
    "description": "Accessibility is the key to inclusion",
    "email": "pwdindore@gmail.com",
    "phone": "1234567890",
},
{
    "name": "Horticulture & Food Processing",
    "description": "Managing urban horticulture and food processing.",
    "email": "horticulture@municipalcorp.gov",
    "phone": "2345678901",
},
{
    "name": "Department of Energy",
    "description": "Responsible for energy management.",
    "email": "energy@municipalcorp.gov",
    "phone": "3456789012",
},
{
    "name": "Department of Sports & Youth Welfare",
    "description": "Promoting sports and youth welfare activities.",
    "email": "sports@municipalcorp.gov",
    "phone": "4567890123",
},
{
    "name": "Water Resources Department",
    "description": "Managing water resources and distribution.",
    "email": "water@municipalcorp.gov",
    "phone": "5678901234",
}]



const router = express.Router();

router.post("/test", async(req, res)=>{    
    for(let i = 0; i<data.length; i++){
        const response = await department.create(data[i]);
        console.log(response);
    }

    res.send(200);

})

export default router;