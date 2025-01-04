import * as aiController from "../controller/ai.controller.js";
import { Router } from "express";
const router = Router();

router.get("/get-result", aiController.getResult);

export default router;
