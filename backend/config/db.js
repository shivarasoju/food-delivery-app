import mongoose from "mongoose";

export const connectDB = async () => {
  // console.log(process.env.MONGODB_URI);
  // console.log(process.env.CLOUDINARY_API_KEY);
  // console.log(process.env.CLOUDINARY_CLOUD_NAME);
  // console.log(process.env.CLOUDINARY_API_SECRET);
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("DB Connected..."));
};
