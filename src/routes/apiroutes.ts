import express from "express"
import { Signup } from "../controller/controller";

const router = express.Router();

router.post("/signup", Signup)
router.post("/public-login", )



export default router;