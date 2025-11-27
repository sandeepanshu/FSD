import express from "express";
import UserTable from "../models/User.ts";
import type { IAddress } from "../models/IUser.ts";
import bcrypt from "bcryptjs";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import verifyToken from "../middlewares/TokenVerifier.ts";

const userRouter: express.Router = express.Router();

/**
 * @info : Register a User
 * @url : POST http://localhost:5000/api/users/register
 */
userRouter.post(
  "/register",
  [
    body("name").not().isEmpty().withMessage("Name is Required"),
    body("email").not().isEmpty().withMessage("Email is Required"),
    body("password").not().isEmpty().withMessage("Password is Required"),
  ],
  async (request: express.Request, response: express.Response) => {
    console.log("\n====== REGISTER ROUTE HIT ======");
    console.log("Request body:", request.body);

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      console.log("Validation errors:", errors.array());
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password } = request.body;

      const existingUser = await UserTable.findOne({ email });
      console.log("Existing user:", existingUser);

      if (existingUser) {
        return response
          .status(401)
          .json({ errors: [{ msg: "User already Exists" }] });
      }

      // encrypt password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log("Password hashed successfully");

      const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

      const address: IAddress = {
        flat: "",
        street: "",
        landmark: "",
        city: "",
        state: "",
        country: "",
        pin: "",
        mobile: "",
      };

      const newUser = new UserTable({
        name,
        email,
        password: hashedPassword,
        avatar,
        address,
      });

      await newUser.save();
      console.log("User registered successfully:", email);

      response.status(200).json({
        msg: "Registration is Success",
      });
    } catch (error: any) {
      console.error("REGISTER ERROR:", error);
      response.status(500).json({ errors: [{ msg: error.message }] });
    }
  }
);

/**
 * @info : Login a User
 * @url : POST http://localhost:5000/api/users/login
 */
userRouter.post(
  "/login",
  [
    body("email").not().isEmpty().withMessage("Email is Required"),
    body("password").not().isEmpty().withMessage("Password is Required"),
  ],

  async (request: express.Request, response: express.Response) => {
    console.log("\n====== LOGIN ROUTE HIT ======");
    console.log("Request body:", request.body);
    console.log("JWT SECRET:", process.env.JWT_SECRET_KEY);

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      console.log("Validation errors:", errors.array());
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = request.body;

      const user = await UserTable.findOne({ email });
      console.log("User found:", user ? user.email : "NO");

      if (!user) {
        return response
          .status(401)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password match:", isMatch);

      if (!isMatch) {
        return response
          .status(401)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: { id: user._id.toString(), name: user.name },
      };

      console.log("Creating JWT token with payload:", payload);

      jwt.sign(payload, process.env.JWT_SECRET_KEY as string, (err, token) => {
        if (err) {
          console.log("JWT Signing Error:", err);
          throw err;
        }

        console.log("Login Success! Token created.");
        response.status(200).json({
          msg: "Login is Success",
          token,
        });
      });
    } catch (error: any) {
      console.error("LOGIN ERROR:", error);
      response.status(500).json({ errors: [{ msg: error.message }] });
    }
  }
);

/**
 * @info : Get User Info
 * @url : GET http://localhost:5000/api/users/
 * @access : Private
 */
userRouter.get(
  "/",
  verifyToken,
  async (request: express.Request, response: express.Response) => {
    console.log("\n====== GET USER INFO ROUTE HIT ======");

    try {
      const requestUserStr: any = request.headers["user"];
      console.log("Decoded user:", requestUserStr);

      const requestUser = JSON.parse(requestUserStr);

      const user = await UserTable.findById(requestUser.id).select("-password");
      console.log("User loaded:", user?.email);

      response.status(200).json(user);
    } catch (error: any) {
      console.error("GET USER ERROR:", error);
      response.status(500).json({ errors: [{ msg: error.message }] });
    }
  }
);

/**
 * @info : Update / Create Address
 * @url : POST http://localhost:5000/api/users/address
 */
userRouter.post(
  "/address",
  [
    body("flat").not().isEmpty().withMessage("Flat is Required"),
    body("street").not().isEmpty().withMessage("Street is Required"),
    body("landmark").not().isEmpty().withMessage("Landmark is Required"),
    body("city").not().isEmpty().withMessage("City is Required"),
    body("state").not().isEmpty().withMessage("State is Required"),
    body("country").not().isEmpty().withMessage("Country is Required"),
    body("pin").not().isEmpty().withMessage("Pin is Required"),
    body("mobile").not().isEmpty().withMessage("Mobile is Required"),
  ],
  verifyToken,
  async (request: express.Request, response: express.Response) => {
    console.log("\n====== UPDATE ADDRESS ROUTE HIT ======");
    console.log("Body:", request.body);

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      console.log("Validation errors:", errors.array());
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const requestUserStr: any = request.headers["user"];
      console.log("Decoded user:", requestUserStr);

      const requestUser = JSON.parse(requestUserStr);

      const user = await UserTable.findById(requestUser.id);
      console.log("User found for update:", user?.email);

      if (!user) {
        return response.status(404).json({ errors: [{ msg: "User not found" }] });
      }

      user.address = request.body;
      await user.save();

      console.log("Address updated");
      response.status(200).json({ msg: "Address is updated" });
    } catch (error: any) {
      console.error("UPDATE ADDRESS ERROR:", error);
      response.status(500).json({ errors: [{ msg: error.message }] });
    }
  }
);

export default userRouter;
