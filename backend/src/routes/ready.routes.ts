import { Router } from "express";
import { checkDBConnection } from "../controllers/ready.controller.js";
import { asyncHandler } from "../utils/async-handler.js";

const router = Router();

router.get("/", asyncHandler(checkDBConnection));

export default router;
