import express from "express";
import { stripePayment, phonePePayment} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/stripePay", stripePayment);
router.post("/phonePe", phonePePayment);

export default router;