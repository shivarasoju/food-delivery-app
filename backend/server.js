import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//app config

const app = express();

//middleware
app.use(express.json());
app.use(cors());

// database connnection
connectDB();

//food api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));

//user api endpoints
app.use("/api/user", userRouter);

//cart api endpoints

app.use("/api/cart", cartRouter);

//order api endpoints
app.use("/api/order", orderRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
