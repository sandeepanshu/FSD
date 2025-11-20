import http from 'http'; // load modules
import * as str from "./util/strOperations.ts";

const hostName:string = '127.0.0.1';
const port:number = 5000;
let output : string = '';

const server:http.Server = http.createServer((request:http.IncomingMessage , response:http.ServerResponse) => {
    response.statusCode = 200;
    response.setHeader('Content-Type' , 'text/html');

    // custom Modules
    let message:string = 'Good Morning';
    let rev:string = str.reverseStr(message);
    print(rev);

    let sum = str.add(10,200);
    print(sum.toString());

    response.end(`<pre style="color: orangered">${output}</pre>`);
});

let print = (str:string) => {
    output += `${str} \n`;
};

server.listen(port , hostName , () => {
    console.log(`Node JS Server is Started at http://${hostName}:${port}`);
});
