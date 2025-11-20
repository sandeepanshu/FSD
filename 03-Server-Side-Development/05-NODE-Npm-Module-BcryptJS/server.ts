import http from "http";
import bcrypt from "bcryptjs";

const hostName: string = "127.0.0.1";
const port: number = 5000;
let output: string = "";

// interface
interface IUser {
  name: string;
  email: string;
  password: string;
}

const server: http.Server = http.createServer(
  async (request: http.IncomingMessage, response: http.ServerResponse) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");

    // Bcrypt JS
    let user: IUser = {
      name: "Sandeep",
      email: "sandeep@gmail.com",
      password: "Sandy@123",
    };

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // Check password
    const isMatch: boolean = await bcrypt.compare("Sandy@123", user.password);

    if (isMatch) {
      print("Login is Success");
    } else {
      print("Invalid Password");
    }

    response.end(
      `<pre style="color: orangered">${JSON.stringify(
        user,
        null,
        2
      )}\n${output}</pre>`
    );
  }
);

let print = (str: string) => {
  output = `${str}`;
};

server.listen(port, hostName, () => {
  console.log(`Node JS Server is Started at http://${hostName}:${port}`);
});
