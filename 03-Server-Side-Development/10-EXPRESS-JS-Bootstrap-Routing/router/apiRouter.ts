import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const apiRouter: express.Router = express.Router();

// ⭐ Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// home
apiRouter.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

// about
apiRouter.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "about.html"));
});

// services
apiRouter.get("/services", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "services.html"));
});

// contact
apiRouter.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "contact.html"));
});

export default apiRouter;
