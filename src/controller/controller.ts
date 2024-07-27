// import { JwtPayload, Secret, VerifyOptions } from "jsonwebtoken"

import { Request, Response } from "express";
import { Tsignup } from "../Types/types";
import { Puser } from "../schema/Public User/public-user";
import { Duser } from "../schema/Department User/department_user";
import bcrypt from "bcrypt"
import jwt, { Secret } from "jsonwebtoken";

// export const isLoggedIn = (req: Request, res: Response, next: any)=>{
//     console.log("Middleware\n")
//     try{
//         const {token} = req
//         console.log("token ", token)
//         if(token.length==0){
            
//             if(req.url=="/getUserInfo"){
//                 console.log("Here\n")
//                 req.body.login= false;
//                 next();
//                 return;
//             }


//            return res.status(200).json({
//                 suceess: false,
//                 redirect: true,
//                 msg: "No Cookie/token"
//             })
//         } 

//         const jwtSecret: Secret = process.env.jwtSecret || '';
//         const options: VerifyOptions & { complete: true } = {
//             complete: true // This option makes the function return a decoded JWT object with header and payload
//         };
//         const resp: JwtPayload = jwt.verify(token, jwtSecret, options)
//         console.log("decoded token ", resp);
//         next();
//     } catch(e: any){
        
        
//     }

// }



export const Signup = async(req:Request<Tsignup>, res:Response)=>{
    try{
        const {role} = req.body;
        console.log(role);
        if(!role) {
            return res.status(402).json({
                success: true,
                msg: "Please provide role"
            })
        }
        
        if(role == "public"){
            const {username, fullname, email, password, aadhar } = req.body;
            const findUser = await Puser.findOne({username:username, aadhar: aadhar});
            if(findUser){
                //user already exist either with same username or aadhar
                return res.status(409).json({
                    success: false,
                    msg: findUser.aadhar == aadhar && "aadhar already linked with an account" || findUser.username == username &&  "username already taken" || findUser.email == email &&  "email already taken"
                })
            }

            const new_user = await Puser.create({username, fullname, email, password, aadhar});
            if(!new_user) return res.status(401).json({success: false, msg: "Unable to make account"})
            
            return res.status(200).json({
            success: true,
            msg: "Successfully Created account"
            })
        } else{
            const {username, fullname, email, password, designation, department}  = req.body;
            
            const findUser = await Duser.findOne({username:username});
            if(findUser){
                //user already exist either with same username or aadhar
                return res.status(409).json({
                    success: false,
                    msg: "username already taken"
                })
            }
            const encryptedPassword = await bcrypt.hash(password, 10);
            const newuser = await Duser.create({username, fullname, email, password:encryptedPassword, designation, department});
            if(!newuser) return res.status(401).json({success: false, msg: "Unable to create account"});
            return res.status(200).json({
                success: true,
                msg: "Successfully Created account"
            })
        }
    } catch(e){
        return res.status(500).json({success: false, msg: e._message})
    }
}

export const public_login = async(req:Request<{username: string, password: string}>, res:Response)=>{
    try{ 
        const {username, password} = req.body;
        
        if(!username || !password) return res.status(401).json({success: false, msg: "Incomplete details"})
        const findUser = await Puser.findOne({username: username});
        if(!findUser) return res.status(401).json({success: false, msg: "Account does not exist"});
        const comparePassword = await bcrypt.compare(findUser.password, password);
        if(!comparePassword) return res.status(401).json({success: false, msg: "Incorrect Password"});
        
        const jwtSecret: Secret = process.env.jwtSecret || '';
        const payload = {
            username: findUser.username,
            role: "public"
        };
        const options = {
            expiresIn: "15d"
        };
        const token = jwt.sign(payload, jwtSecret, options);
        return res.status(200).json({success: true, msg: "Successfully Logged in", token});
        
    } catch(e){
        res.status(501).json({success: false, msg: "Internal server error"})
    }
}