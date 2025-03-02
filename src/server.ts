
import express, { Request, Response, NextFunction, response } from 'express';
import cors from "cors";


const app = express()

app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
  }));

app.use(express.json());

app.get('/',((req: Request, response:Response)=>{
    response.send("teste")

}))
const PORT = 3000;
app.listen(PORT,()=>{

    console.log("Servidor rodando na porta ",PORT);

})