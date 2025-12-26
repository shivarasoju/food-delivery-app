import mongoose from "mongoose";

import foodData from "./data/foodData.js";
import foodModel from "./models/foodModel.js";
import { connectDB } from "./config/db.js";

const seedDB = async () => {
  try {
    connectDB();

    await foodModel.deleteMany();
    console.log("Old food data removed");

    await foodModel.insertMany(foodData);
    console.log("Food data seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();
