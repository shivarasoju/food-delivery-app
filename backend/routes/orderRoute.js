import express from "express";

import {
  listOrders,
  placeOrder,
  trackOrder,
  updateOrderStatus,
  userOrders,
  verifyOrder,
} from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);

orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/list", listOrders);
orderRouter.post("/update", updateOrderStatus);

orderRouter.post("/order/track", authMiddleware, trackOrder);

export default orderRouter;
