import express from "express";
import { payPal } from "../controllers/payPal.controller.js";

const router = express.Router();

router.post("/payPal", payPal);

export default router;