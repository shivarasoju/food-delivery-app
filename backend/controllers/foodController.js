import foodModel from "../models/foodModel.js";

import fs from "fs";

// add fooditem
import cloudinary from "../config/cloudinary.js"; // adjust path as needed

// const addFood = async (req, res) => {
//   try {
//     // Upload to Cloudinary
//     console.log(req.file);
//     const result = await cloudinary.uploader.upload(req.file.path);

//     // If upload is successful, keep the local file
//     const food = new foodModel({
//       name: req.body.name,
//       description: req.body.description,
//       price: req.body.price,
//       category: req.body.category,
//       image: result.secure_url,
//     });

//     await food.save();

//     res.json({ success: true, message: "Food Added" });
//   } catch (error) {
//     console.log(error);

//     //Only delete local file when something fails
//     if (req.file && req.file.path) {
//       try {
//         fs.unlinkSync(req.file.path);
//       } catch (err) {
//         console.log("Failed to remove local file:", err);
//       }
//     }

//     res.json({ success: false, message: "Error in foodController" });
//   }
// };

//all food list
const addFood = async (req, res) => {
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
