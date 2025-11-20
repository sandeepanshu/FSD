import http from "http";
import os from "os";

const hostName = "127.0.0.1";
const port = 5000;

const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader("Content-Type", "text/html");

  let output = ""; // ❗ FIXED: reset output on every request

  const print = (str: string) => {
    output += `${str}\n`;
  };

  // OS Module outputs
  print(`Total Memory : ${os.totalmem()}`);
  print(`Free Memory  : ${os.freemem()}`);
  print(`Computer Name: ${os.hostname()}`);

  response.end(`<pre style="color: orangered">${output}</pre>`);
});

server.listen(port, hostName, () => {
  console.log(`Node JS Server is running at http://${hostName}:${port}`);
});
