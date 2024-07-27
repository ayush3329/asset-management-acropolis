import express from "express"
import { addAsset, addDepartment, getAllAsset, getAllDepartments, getAssetDetail, Signup } from "../controller/controller";

const router = express.Router();

router.post("/signup", Signup);
router.post("/add-department", addDepartment);
router.post("/add-assets", addAsset);
router.post("/getallAsset", getAllAsset);
router.get("/get-department-name", getAllDepartments);
router.post("/get-asset-detail", getAssetDetail);



export default router;