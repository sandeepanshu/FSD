import express from "express";
import apiRouter from "./router/apiRouter.ts";

const app: express.Application = express();
const hostName = "127.0.0.1";
const port = 5000;

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("<h2>Express Server Running...</h2>");
});

// Employee APIs
app.use("/", apiRouter);

app.listen(port, hostName, () => {
  console.log(`Express Server started at http://${hostName}:${port}`);
});
