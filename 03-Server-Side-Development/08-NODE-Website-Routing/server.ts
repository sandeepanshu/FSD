import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// __dirname fix (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hostName: string = "127.0.0.1";
const port: number = 5000;

const server = http.createServer(
  async (request: http.IncomingMessage, response: http.ServerResponse) => {
    const url: string | undefined = request.url;

    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");

    const renderPage = (file: string) => {
      const filePath = path.join(__dirname, "views", file);

      fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
          console.error("FILE NOT FOUND:", filePath);
          response.statusCode = 404;
          return response.end("<h1>404 File Not Found</h1>");
        }
        response.statusCode = 200;
        response.end(data);
      });
    };

    // ROUTES
    if (url === "/" && request.method === "GET") {
      renderPage("index.html");
    } else if (url === "/about") {
      renderPage("about.html");
    } else if (url === "/services") {
      renderPage("services.html");
    } else if (url === "/contact") {
      renderPage("contact.html");
    } else {
      response.statusCode = 404;
      renderPage("404.html");
    }
  }
);

server.listen(port, hostName, () => {
  console.log(`Node JS Server is Started at http://${hostName}:${port}`);
});
