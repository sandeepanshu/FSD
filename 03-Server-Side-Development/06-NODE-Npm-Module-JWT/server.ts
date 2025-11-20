import http from "http";
import jwt from "jsonwebtoken";

const hostName: string = "127.0.0.1";
const port: number = 5000;

// interface
interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

const server: http.Server = http.createServer(
  async (request: http.IncomingMessage, response: http.ServerResponse) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");

    // User
    let user: IUser = {
      id: "AA456ASFD234",
      name: "Sandeep",
      email: "sandeep@gmail.com",
      password: "Sandy@123",
    };

    // create a Token
    let payload = {
      user: {
        id: user.id,
        name: user.name,
      },
    };

    let token = await jwt.sign(payload, "ssshhhh");

    // verify the token
    let decode = await jwt.verify(token, "ssshhhh");

    response.end(`<pre style="color: orangered">${token}  </pre>
                        <pre>${JSON.stringify(decode)}</pre>`);
  }
);

server.listen(port, hostName, () => {
  console.log(`Node JS Server is Started at http://${hostName}:${port}`);
});
