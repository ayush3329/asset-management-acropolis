// import { JwtPayload, Secret, VerifyOptions } from "jsonwebtoken"

import { Request, Response } from "express";
import { Tsignup } from "../Types/types";
import { Puser } from "../schema2/Public User/public-user";
import { Duser } from "../schema2/Department User/department_user";
import bcrypt from "bcrypt"
import jwt, { Secret } from "jsonwebtoken";
import { department } from "../schema2/Department";
import { asset } from "../schema2/asset";
import { MongooseError } from "mongoose";

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

type AddDepatTypes = {
    name: string,
    email: string,
    phone: string
}

export const addDepartment = async(req:Request<AddDepatTypes>, res:Response) =>{
    try{
        let {name, email, phone} = req.body as AddDepatTypes;
        console.log(typeof name)
        console.log(name)
        name = name.toLocaleLowerCase()
        if(!name || !email || !phone) {
            return res.status(401).json({
                success: false,
                msg: "Please enter all details"
            })
        }

        const findOtherDepart = await department.findOne({
            $or: [
            { name: name },
            { email: email },
            { phone: phone }
            ]
        });

        if(findOtherDepart) return res.status(401)
            .json({success: false, 
            msg: findOtherDepart.name == name && "Department name already taken" || 
                  findOtherDepart.email == email && `Email already registered with ${findOtherDepart.name} department` || 
                  findOtherDepart.phone == phone && `phone no already registered with ${findOtherDepart.name} department`

        }) 
        
        const addDepart = await department.create({name, email, phone});
        if(!addDepart) return res.status(401).json({success: false, msg: "Unable to add department"})
        return res.status(200).json({
            success: true,
            msg: "Successfully created Department",
            data: {
                id: addDepart._id,
                name: addDepart.name,
                email: addDepart.email,
                phone: addDepart.phone
            }
        })
    } catch(e){
        console.log(e);
        res.status(501).json({success: false, msg: "Internal server error"})
    }
}

type AssetRequest = {
    deptId: string,
    type: string,
    uniqueId: string[]
}

export const addAsset = async (req:Request<AssetRequest>, res:Response)=>{
    try{
        let {deptId, type, uniqueId} = req.body as AssetRequest;
        type = type.toLocaleLowerCase();
        if(!deptId || !type || !uniqueId) return res.status(401).json({success: false, msg: "Please provide all details"})   
        const assetsIds:string[] = [];
        let totalAddedAsset = 0;
        for(let i = 0; i<uniqueId.length; i++){
            const newasset =  await asset.create({departmentId: deptId, type: type, uniqueId: uniqueId[i]});
            if(!newasset) continue;
            assetsIds.push(newasset._id.toString());
            totalAddedAsset++;
        }
        let updateDept = await department.updateOne( { _id: deptId },    { 
            $inc: { total_asset: totalAddedAsset },
            $addToSet: { typeofasset: type }
        })
        
        for(let i = 0; i<assetsIds.length; i++){
            await department.updateOne({_id: deptId}, {
                $addToSet: {asset: assetsIds[i]}
            })
        }

        console.log(updateDept);
        return res.status(200).json({success: true, msg:"Successfully added assets"})

    } catch(e){
        console.log(e.message)
        res.status(501).json({success: false, msg: e.message});
    }
}

type TgetAll = {
    name: string
}

export const getAllAsset = async(req:Request<TgetAll>, res:Response)=>{
    try{
        let {name} = req.body as TgetAll;
        if(!name) return res.status(401).json({success: false, msg: "Please provide all detail"});
        name = name.toLocaleLowerCase();
        const allAsset = await department.findOne({name}).populate({
            path: 'asset', 
            populate: [
            { path: 'departmentId' },
            { path: 'assignedToDept' }
            ] 
        })
        if(!allAsset) return res.status(402).json({success: false, msg: "Unable to fetch asset"});
        let _allAsset = allAsset.toObject();
        let countofDiffenetAsset: { [key: string]: number[] } = {};
        
        _allAsset.asset = _allAsset.asset.map((asset: any) => {
            const { departmentId, ...rest } = asset;
            if (countofDiffenetAsset[rest.type]) {
                countofDiffenetAsset[rest.type][0]++;
                if(!asset.vacant) countofDiffenetAsset[rest.type][1]++; 
            } else {
                countofDiffenetAsset[rest.type] = [1, 0];
                // console.log(asset.vacant)
                if(!asset.vacant) countofDiffenetAsset[rest.type][1]++; 
                
            }
            return {
                ...rest,
                department_name: departmentId.name,
                assignedToDept: rest.assignedToDept.name
                
            };
        });
        
        console.log(countofDiffenetAsset);

        let assetMetaData = [];
        
        const keys = Object.keys(countofDiffenetAsset);

        for(let i = 0; i<keys.length; i++){
            assetMetaData.push({
                name: keys[i],
                total: countofDiffenetAsset[keys[i]][0],
                assigned: countofDiffenetAsset[keys[i]][1],
            })
        }


        return res.status(200).json({success: true, msg: "Assets fetched successfully", data: {..._allAsset, assetMetaData}})
        

    } catch(e){
        console.log(e)
        return res.status(500).json({error: "error"})
    }
}




export const getAllDepartments = async (req: Request, res: Response) => {
    try {
        const departments = await department.find({});
       
        return res.status(200).json({
            success: true,
            msg: "Department names fetched successfully",
            data: departments
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, msg: "Internal server error" });
    }
}

export const getAssetDetail = async(req:Request, res:Response)=>{
    try{
        const {deptId, asset_type} = req.body;
        
        if(!deptId || !asset_type) return res.status(401).json({success: false, msg: "Please fill all details"});
        
        const assets = await asset.find({ departmentId: deptId, type: asset_type });
        return res.status(200).json({success: true, msg: `successfully fetched detail of ${asset_type}`,data: [...assets]})


    } catch(e){
        console.log(e);
        return res.status(501).json({success: false})
    }
}