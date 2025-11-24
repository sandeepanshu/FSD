import express from "express";
import dotEnv from "dotenv";
import mongoose from "mongoose";
import productRouter from "./router/productRouter.ts";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: express.Application = express();

app.use(cors());

// Load env
dotEnv.config({
  path: path.resolve(__dirname, ".env"),
});

// Middleware
app.use(express.json());

// ENV Values
const hostName = process.env.HOST_NAME || "127.0.0.1";
const port = Number(process.env.PORT) || 5000;
const mongoDBURL = process.env.MONGO_DB_LOCAL_URL;

// Connect to MongoDB (Mongoose v7+)
if (mongoDBURL) {
  mongoose
    .connect(mongoDBURL)
    .then(() => {
      console.log("Connected to MongoDB Successfully....");
    })
    .catch((err) => {
      console.error("MongoDB Connection Error:", err);
      process.exit(1);
    });
}

// Default Route
app.get("/", (req, res) => {
  res.status(200).send("<h2>Express Server for BigBasket Application</h2>");
});

// Routers
app.use("/api", productRouter);

// Start Server
app.listen(port, hostName, () => {
  console.log(`Express Server is Started at http://${hostName}:${port}`);
});
