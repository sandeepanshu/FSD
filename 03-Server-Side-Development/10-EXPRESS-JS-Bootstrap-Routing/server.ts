import express from "express";
import path from "path";
const app: express.Application = express();
import apiRouter from "./router/apiRouter.ts";

const hostName: string = "127.0.0.1";
const port: number = 5000;
const __dirname = path.resolve();

app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/public", express.static(path.join(__dirname, "public")));

// configure routing
app.use("/", apiRouter);

app.listen(port, hostName, () => {
  console.log(`Express Server is Started at http://${hostName}:${port}`);
});
