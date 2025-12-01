import express from "express";
import { body, validationResult } from "express-validator";
import UserTable from "../models/UserTable.ts";
import bcrypt from "bcryptjs";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import type { IUser } from "../models/IUser.ts";

import verifyToken from "../middlewares/TokenVerifier.ts";

const userRouter: express.Router = express.Router();

/*
  @usage : Register a User
  @url :   POST http://127.0.0.1:5000/api/users/register
  @fields : name , email, password
  @access : PUBLIC
*/
userRouter.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name is Required"),
    body("email").isEmail().withMessage("Valid Email is Required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be minimum 6 chars"),
  ],
  async (request: express.Request, response: express.Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password, isAdmin } = request.body;

      // Check if user already exists
      const existingUser: IUser | null = await UserTable.findOne({
        email: email,
      });
      if (existingUser) {
        console.log("❌ User already exists:", email);
        return response.status(409).json({
          errors: [{ msg: "User already exists" }],
        });
      }

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Get gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      // Create user (isAdmin removed from request body for security)
      const newUser = new UserTable({
        name,
        email,
        password: hashedPassword,
        avatar,
        isAdmin: isAdmin ?? false,
        // isAdmin defaults to false from schema
      });

      await newUser.save();
      console.log("✅ User registered successfully:", email);

      return response.status(201).json({
        msg: "Registration successful",
      });
    } catch (error: any) {
      console.error("❌ Registration error:", error);
      return response.status(500).json({
        errors: [{ msg: "Server Error", details: error.message }],
      });
    }
  }
);

/*
  @usage : Login a User
  @url :   POST http://127.0.0.1:5000/api/users/login
  @fields : email, password
  @access : PUBLIC
*/
userRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid Email is Required"),
    body("password").notEmpty().withMessage("Password is Required"),
  ],
  async (request: express.Request, response: express.Response) => {
    console.log("🔐 Login endpoint hit");
    
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      console.log("❌ Validation errors:", errors.array());
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = request.body;

      // Check user
      const user: IUser | null = await UserTable.findOne({ email });
      if (!user) {
        console.log("❌ User not found:", email);
        return response
          .status(401)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("❌ Password mismatch for:", email);
        return response
          .status(401)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // JWT Payload
      const payload = {
        user: {
          id: user.id,
          name: user.name,
        },
      };

      const secretKey = process.env.JWT_SECRET_KEY;
      if (!secretKey) {
        console.log("❌ JWT Secret missing");
        return response.status(500).json({
          errors: [{ msg: "Server Error: Missing JWT Secret" }],
        });
      }

      // Generate Token
      const token = jwt.sign(payload, secretKey, { expiresIn: "7d" });
      console.log("✅ Login successful for:", email);
      console.log("Generated token:", token);

      return response.status(200).json({
        msg: "Login successful",
        token,
      });
    } catch (error: any) {
      console.error("❌ Login error:", error);
      return response.status(500).json({
        errors: [{ msg: "Server Error", details: error.message }],
      });
    }
  }
);

/*
  @usage : Get Logged-in User Info
  @url :   GET http://127.0.0.1:5000/api/users/me
  @method : GET
  @access : PRIVATE
*/
userRouter.get(
  "/me",
  verifyToken,
  async (req: express.Request, res: express.Response) => {
    console.log("👤 /me endpoint hit");
    
    try {
      const loggedUser: any = (req as any).user;

      if (!loggedUser?.id) {
        console.log("❌ Invalid token data");
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid token data" }] });
      }

      const user = await UserTable.findById(loggedUser.id).select("-password");

      if (!user) {
        console.log("❌ User not found:", loggedUser.id);
        return res.status(404).json({ errors: [{ msg: "User not found" }] });
      }

      console.log("✅ User info retrieved:", user.email);
      return res.status(200).json({ msg: "User info retrieved", user });
    } catch (error: any) {
      console.error("❌ /me error:", error);
      return res.status(500).json({ 
        errors: [{ msg: "Server Error", details: error.message }] 
      });
    }
  }
);

export default userRouter;