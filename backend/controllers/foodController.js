import foodModel from "../models/foodModel.js";

import fs from "fs";

// add fooditem
import cloudinary from "../config/cloudinary.js"; // adjust path as needed
import streamifier from "streamifier";

const addFood = async (req, res) => {
  console.log(req.file);

  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image required" });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "food-images" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: result.secure_url,
    });

    await food.save();

    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
};

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//remomve item

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    console.log(food.image);

    fs.unlink(`uploads/${food.image}`, (err) => {});
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addFood, listFood, removeFood };
