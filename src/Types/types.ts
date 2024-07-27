import { Request, request } from "express";

type Tpuser = {
    username: string,
    fullname: string,
    email: string,
    password: string
    aadhar: string,
}


type Tduser = Pick<Tpuser, 'username' | 'password' | 'email' | 'fullname'> & {
    designation : string,
    department: string
};



export type Tsignup =  { role: 'public'; data: Tpuser } | { role: 'official'; data: Tduser };