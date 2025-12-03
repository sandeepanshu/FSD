// 1. Load dotenv BEFORE any imports
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });

// 2. Imports
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import path from "path";
import { fileURLToPath } from "url";

// 3. Directory setup for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 4. App Initialization
const app: express.Application = express();

// 5. CORS Configuration
const allowedOrigins: string[] = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
    exposedHeaders: ["x-auth-token"],
    credentials: true,
  })
);

app.use(express.json());

// 6. Routers (Use .ts for TypeScript)
import userRouter from "./router/userRouter.ts";
import profileRouter from "./router/ProfileRouter.ts";
import postRouter from "./router/postRouter.ts";

// 7. environment variables
const PORT = Number(process.env.PORT);
const MONGO_URL = process.env.MONGO_DB_URL;

if (!MONGO_URL) {
  console.error("❌ ERROR: MONGO_DB_URL is NOT defined in .env");
  process.exit(1);
}

// 8. MongoDB Connection
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err);
    process.exit(1);
  });

// 9. Default Route (UPDATED)
app.get("/", (req, res) => {
  console.log("✅ Root endpoint hit");
  res.setHeader("Content-Type", "text/html");
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Social App API</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: #f5f5f5;
          }
          .container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          h1 { color: #333; }
          .endpoint { 
            background: #f0f0f0; 
            padding: 10px; 
            margin: 10px 0;
            border-radius: 4px;
            font-family: monospace;
          }
          .success { color: green; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🚀 Social App Backend API</h1>
          <p class="success">✅ Server is running successfully!</p>
          <h3>Available Endpoints:</h3>
          <div class="endpoint">POST /api/users/register</div>
          <div class="endpoint">POST /api/users/login</div>
          <div class="endpoint">GET /api/users/me (Protected)</div>
          <p>MongoDB: <span class="success">Connected</span></p>
        </div>
      </body>
    </html>
  `);
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// 10. API Routes
app.use("/api/users", userRouter);
app.use("/api/profiles", profileRouter);
app.use("/api/posts", postRouter);

// 11. Start Server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`🚀 Also accessible at http://127.0.0.1:${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
});
