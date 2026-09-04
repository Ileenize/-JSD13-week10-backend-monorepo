import { Router } from "express";
import { Router as v1Routes} from "/v1/index.js";

export const router = Router();

router.use("/v1", v1Routes);