import express from 'express';
import dotEnv from 'dotenv';
import mongoose from 'mongoose';
import productRouter from "./router/productRouter";
import cors from 'cors';

const app:express.Application = express();

// configure cors
app.use(cors());

// configure dotEnv
dotEnv.config({path : './.env'});

// configure Express to receive the form data
app.use(express.json());

const hostName:string | undefined  = process.env.HOST_NAME;
const port:number | undefined = Number(process.env.PORT);
const mongoDBURL : string | undefined = process.env.MONGO_DB_LOCAL_URL;

// Connect to MongoDB
if(mongoDBURL !== undefined){
    mongoose.connect(mongoDBURL, {
        useNewUrlParser : true,
        useUnifiedTopology : true,
        useFindAndModify : false,
        useCreateIndex : true
    }).then((response) => {
        console.log('Connected to MongoDB Successfully....');
    }).catch((error) => {
        console.error(error);
        process.exit(1); // stop the node js process
    });
}

app.get('/', (request:express.Request , response:express.Response) => {
    response.status(200).send(`<h2>Express Server for BigBasket Application</h2>`);
});

// configure the Routing
app.use('/api', productRouter);

if(port !== undefined && hostName !== undefined){
    app.listen(port , hostName, () => {
        console.log(`Express Server is Started at http://${hostName}:${port}`);
    });
}
