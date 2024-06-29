import express from "express";
import { stripePayment, stripeIndia } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/stripePay", stripePayment);
router.post("/stripeIndia", stripeIndia);

export default router;