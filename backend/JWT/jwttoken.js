// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (res, userID) => {
  const payload = { userID };
  const secretKey = process.env.JWT_SECRET;

  const token = jwt.sign(payload, secretKey, { expiresIn: '30d' }); // 30 days
  console.log("Token generated:", token);
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
  });

  return token;
};

export default generateTokenAndSetCookie;
