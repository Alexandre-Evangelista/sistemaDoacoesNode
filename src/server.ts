import { prisma } from './Database/repository.js';
import express, { Request, Response, NextFunction, response } from 'express';
import cors from "cors";
import ongRouter from './routes/ONG/ongRoutes.js';
import usuarioRouter from './routes/usuarioRoutes.js';
import campanhaRouter from './routes/campanhaRoute.js';
import dotenv from 'dotenv';
import path from 'path';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import doacaoRouter from './routes/Doacao/DoacaoRoute.js';
dotenv.config();
const app = express()

app.use("/uploads", express.static("uploads"));
app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
  }));

app.use(express.json());
app.use("/",campanhaRouter);
app.use("/",usuarioRouter);
app.use("/",ongRouter);
app.use("/",doacaoRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(
  path.resolve(__dirname, '..', 'images')
);
app.use(
  '/uploads',
  express.static(path.resolve(__dirname, '..', 'images'))
);

app.get('/',((req: Request, response:Response)=>{
    response.send("teste")

}))
const PORT = 3000;
app.listen(PORT,()=>{

    console.log("Servidor rodando na porta ",PORT);

})