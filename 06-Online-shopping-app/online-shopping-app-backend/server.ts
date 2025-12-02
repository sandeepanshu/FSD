// ---------------------------------------------------
// 1. Load dotenv BEFORE ANY OTHER IMPORTS
// ---------------------------------------------------
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });

// ---------------------------------------------------
// 2. Import libraries
// ---------------------------------------------------
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// ---------------------------------------------------
// 3. Create Express App FIRST
// ---------------------------------------------------
const app: express.Application = express();

// ---------------------------------------------------
// 4. APPLY MIDDLEWARE BEFORE ROUTER IMPORTS  << FIXED
// ---------------------------------------------------
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "x-auth-token"],
    exposedHeaders: ["x-auth-token"],
    credentials: true,
  })
);

app.use(express.json());

// ---------------------------------------------------
// 5. Now Import Routers (AFTER middleware) << FIXED
// ---------------------------------------------------
import userRouter from "./router/userRouter.ts";
import productRouter from "./router/productRouter.ts";
import orderRouter from "./router/orderRouter.ts";
import paymentRouter from "./router/paymentRouter.ts";

// ---------------------------------------------------
// 6. MongoDB Connection
// ---------------------------------------------------
const port = process.env.PORT || 5000;

if (!process.env.MONGO_DB_CLOUD) {
  console.error("❌ ERROR: MONGO_DB_CLOUD is NOT defined in .env");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_DB_CLOUD)
  .then(() => console.log("Connected to MongoDB Successfully."))
  .catch((err) => {
    console.error("MongoDB Connection Failed:", err);
    process.exit(1);
  });

// ---------------------------------------------------
// 7. Root Route
// ---------------------------------------------------
app.get("/", (req, res) => {
  res.send("<h2>Online Shopping Application Backend</h2>");
});

// ---------------------------------------------------
// 8. API Routes
// ---------------------------------------------------
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/payments", paymentRouter);

// ---------------------------------------------------
// 9. Start Server
// ---------------------------------------------------
app.listen(Number(port), "localhost", () => {
  console.log(`✔ Express Server Started at: http://localhost:${port}`);
});
