import express from "express";
import { handleTest2 } from "../controllers/test2Controller.js";
import { handleTest3 } from "../controllers/test3Controller.js";
import { handleTest4 } from "../controllers/test4Controller.js";
const router = express.Router();

router.post("/test2", handleTest2);
router.post("/test3", handleTest3);
router.get("/test4",handleTest4)

export default router;