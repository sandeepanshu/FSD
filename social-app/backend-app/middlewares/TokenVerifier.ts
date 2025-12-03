import express from "express";
import jwt from "jsonwebtoken";

const verifyToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({
      errors: [{ msg: "No token provided. Authentication denied" }],
    });
  }

  const secretKey = process.env.JWT_SECRET_KEY;

  if (!secretKey) {
    return res.status(500).json({
      errors: [{ msg: "Server Error: JWT Secret Missing" }],
    });
  }

  try {
    const decoded: any = jwt.verify(token, secretKey);
    (req as any).user = decoded.user;
    next();
  } catch (err: any) {
    return res.status(401).json({
      errors: [{ msg: "Invalid token. Authentication denied" }],
    });
  }
};

export default verifyToken;
