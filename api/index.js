import express from "express";
import cors from "cors";
import paymentRouter from "./routes/payment.route.js";
import bodyParser from "body-parser";
import path from "path"
import dotenv from "dotenv";

dotenv.config();
const app = express();


var Publishable_Key = process.env.STRIPE_PUBLIC;
var Secret_Key = process.env.STRIPE_SECTECT;

const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your client origin
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));


app.use(express.json());

app.listen(3000, () => {
    console.log("server is running on port 3000");
});


app.get('/complete', async (req, res) => {
  try {
    console.log("payment success full");

    res.send('Your payment was successful');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', error });
  }
});

app.get('/cancel', (req, res) => {
  res.redirect('/');
});

app.use("/api/payment", paymentRouter);


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
  });
});