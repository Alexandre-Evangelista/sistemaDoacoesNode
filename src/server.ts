import { prisma } from './Database/repository.js';
import express, { Request, Response, NextFunction, response } from 'express';
import cors from "cors";
import ongRouter from './routes/ONG/ongRoutes.js';
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.JWT_SECRET);

const app = express()

app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
  }));

app.use(express.json());

app.use("/",ongRouter);
app.get('/',((req: Request, response:Response)=>{
    response.send("teste")

}))
const PORT = 3000;
app.listen(PORT,()=>{

    console.log("Servidor rodando na porta ",PORT);

})