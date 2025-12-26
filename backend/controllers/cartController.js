import userModel from "../models/userModel.js";

//add items to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.userId);

    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.userId, { cartData });
    return res.json({ success: true, message: "Added to Cart Successfully!" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Add to cart Failed!" });
  }
};

//remove items from user cart

const removeFromCart = async (req, res) => {
  try {
    let userdata = await userModel.findById(req.userId);
    let cartData = await userdata.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.userId, { cartData });
    return res.json({
      success: true,
      message: "Removed from cart successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Removed from cart Failed!",
    });
  }
};

//fetch user cart data

const getCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    let cartData = await user.cartData;
    return res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Unable to fetch" });
  }
};

export { addToCart, removeFromCart, getCart };
