import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hostName = "127.0.0.1";
const port = 5000;

const server = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");

  let output = "";

  const print = (msg: string) => (output += msg + "\n");

  // PROMISE #1 → Copy message.txt → data.txt
  const p1 = new Promise<void>((resolve, reject) => {
    fs.readFile(path.join(__dirname, "data", "message.txt"), "utf-8", (err, data) => {
      if (err) return reject(err);

      fs.writeFile(path.join(__dirname, "data", "data.txt"), data, "utf-8", (err) => {
        if (err) return reject(err);

        print("✔ Data written to data.txt");
        resolve();
      });
    });
  });

  // PROMISE #2 → Copy server.ts → program/app.ts
  const p2 = new Promise<void>((resolve, reject) => {
    fs.readFile(path.join(__dirname, "server.ts"), "utf-8", (err, data) => {
      if (err) return reject(err);

      fs.writeFile(path.join(__dirname, "program", "app.ts"), data, "utf-8", (err) => {
        if (err) return reject(err);

        print("✔ server.ts copied to program/app.ts");
        resolve();
      });
    });
  });

  // Wait for both operations
  await Promise.all([p1, p2]);

  // NOW send response
  res.end(`<pre style="color: orangered">${output}</pre>`);
});

server.listen(port, hostName, () => {
  console.log(`Server running at http://${hostName}:${port}`);
});
