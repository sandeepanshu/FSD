import express from "express";
import jwt from "jsonwebtoken";

const verifyToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.header("x-auth-token");

  if (!token) {
    console.log("❌ No token provided");
    return res.status(401).json({
      errors: [{ msg: "No token provided. Authentication denied" }],
    });
  }

  const secretKey = process.env.JWT_SECRET_KEY;
  console.log("Secret key exists:", !!secretKey); // Debug: check secret

  if (!secretKey) {
    console.log("❌ JWT Secret missing from environment");
    return res.status(500).json({
      errors: [{ msg: "Server Error: JWT Secret Missing" }],
    });
  }

  try {
    const decoded: any = jwt.verify(token, secretKey);
    console.log("✅ Token verified successfully:", decoded);
    (req as any).user = decoded.user;
    next();
  } catch (err: any) {
    console.log("❌ Token verification failed:", err.message);
    return res.status(401).json({
      errors: [{ msg: "Invalid token. Authentication denied" }],
    });
  }
};

export default verifyToken;
