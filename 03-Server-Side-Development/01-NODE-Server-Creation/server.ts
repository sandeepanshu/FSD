import http, { IncomingMessage, ServerResponse } from "http";

const hostName: string = "127.0.0.1";
const port: number = 5000;

// Create server
const server = http.createServer(
  (request: IncomingMessage, response: ServerResponse) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");

    response.end(`<h2>Welcome to Node JS Server</h2>`);
  }
);

// Start server
server.listen(port, hostName, () => {
  console.log(`Node JS Server is running at http://${hostName}:${port}`);
});
