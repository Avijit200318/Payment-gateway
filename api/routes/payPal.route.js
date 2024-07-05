import express from "express";
import { payPal} from "../controllers/payPal.controller.js";

const router = express.Router();

router.post("/payPal", payPal);
// router.post("/payPalSuccess", successPayPal);

export default router;