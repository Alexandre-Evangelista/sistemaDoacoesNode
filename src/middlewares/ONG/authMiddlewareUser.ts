import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET

interface IPayload {
    email: string;
    iat: number;
    exp: number;
    name: string;
  }
  interface CustomRequest extends Request {
    userEmail?: string;
  }

  export function AutenticarUsuarioToken(req:CustomRequest, res:Response, next: NextFunction){
      const token = req.headers.authorization?.split(" ")[1]
      if(!token){
          return res.status(401).json("Acesso negado, token nao foi infomado na requisiçao")
      }
      try{
          const { email } = jwt.verify(token,JWT_SECRET as string) as IPayload
         
          req.userEmail = email; //acrescentando o cnpj a requisiçao 
          next();
      }catch(error){
          res.status(403).json({ message: "token is not valid" })
      }
  
  }