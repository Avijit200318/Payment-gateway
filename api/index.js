import express from "express";
import cors from "cors";
import paymentRouter from "./routes/payment.route.js";
import bodyParser from "body-parser";
import path from "path"

const app = express();

var Publishable_Key = 'sk_test_51PWuUxHNPIcQuEE9ndYn7qLJC39GfsYY11siqFRMLe2hPuSmQFtGLOKd2QTdybr8LPqHMDDJPEw0LuUarL2l6Enh003Icy6YxI'
var Secret_Key = 'sk_test_51PWuUxHNPIcQuEE9ndYn7qLJC39GfsYY11siqFRMLe2hPuSmQFtGLOKd2QTdybr8LPqHMDDJPEw0LuUarL2l6Enh003Icy6YxI'

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