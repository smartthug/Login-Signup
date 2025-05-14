import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
  console.log("Token in verify token", req.cookies);
  const token = req.cookies.token;
  console.log("Token in verify token", token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized - no token provided" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) return res.status(500).json({ message: "unauthorized" });
    req.userId = decode.userId;
    next();
  } catch (err) {
    console.log("Error in verify token", err);
    return res.status(500).json({ success: false, message: "server Failed" });
  }
};
