import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  // console.log(token);
  if (!token) {
    return res.json({
      success: false,
      message: "Unauthorized - No tokens provided",
    });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decode.id;
    next();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" });
  }
};

export default authMiddleware;
