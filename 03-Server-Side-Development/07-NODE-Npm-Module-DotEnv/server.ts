import http from "http";
import dotenv from "dotenv";
import * as gravatar from "gravatar";
import { v4 as uuidv4 } from "uuid";

// Load .env
dotenv.config({
  path: "./.env",
});

// User interface
interface IUser {
  id: string;
  name: string;
  email: string;
  image: string;
}

const hostName = "127.0.0.1";
const port = 5000;

const server = http.createServer(
  async (request: http.IncomingMessage, response: http.ServerResponse) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");

    // DotEnv values
    const mongoDBURL = process.env.MONGO_DB_LOCAL;
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const prodServerURL = process.env.PROD_URL;

    // Create user
    let user: IUser = {
      id: uuidv4(),
      name: "SANDEEP SHARMA",
      email: "sandeepsharma@gmail.com",
      image: "",
    };

    // Gravatar
    user.image = gravatar.url(user.email, {
      s: "200",
      r: "pg",
      d: "404",
    });

    response.end(`
      <pre style="color: orangered">MONGO DB : ${mongoDBURL}</pre>
      <pre style="color: orangered">JWT : ${jwtSecretKey}</pre>
      <pre style="color: orangered">PROD : ${prodServerURL}</pre>
      <pre style="color: orangered">USER DATA : ${JSON.stringify(
        user,
        null,
        2
      )}</pre>
    `);
  }
);

server.listen(port, hostName, () => {
  console.log(`Node JS Server is Started at http://${hostName}:${port}`);
});
