import express from 'express'
import dotenv from 'dotenv'
import {  dbConnect } from './config/dbConnect';
// import router from './routes/apiroutes';
import cors from 'cors'
import cookieParser  from 'cookie-parser';
import fileUpload from 'express-fileupload'
import router from './routes/apiroutes';


dotenv.config();
const app = express();
const PORT:number = parseInt(process.env.PORT || '8888', 10) 

//adding middlewares
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))

app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true,
    
}))
app.use(cookieParser())

app.get('/', (req, res)=>{
    res.status(200).send("Default API route")
})

app.use("/api/v1", router)

dbConnect();
// cloudinaryConnect();

app.listen(PORT, ()=>{
    console.log(`server started sucessfully at PORT  ${PORT}`);
})