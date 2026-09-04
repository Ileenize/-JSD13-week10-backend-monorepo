import { Router } from "express";
import {router as userRoutes} from "./user.routes.js"

export const router = Router();

router.use("/user",userRoutes);