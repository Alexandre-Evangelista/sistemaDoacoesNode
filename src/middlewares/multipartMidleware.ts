import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
dotenv.config();

export function parseMultipart(req: Request, res: Response, next: NextFunction) {
  console.log("entrou aqui ")
  if (req.body.geolocalizacao && typeof req.body.geolocalizacao == "string") {
    req.body.geolocalizacao = JSON.parse(req.body.geolocalizacao);
     req.body.geolocalizacao.coordinates = [
    Number(req.body.geolocalizacao.coordinates[0]),
    Number(req.body.geolocalizacao.coordinates[1]),
  ];
    
  }

  if (req.body.tipo) {
    req.body.tipo = req.body.tipo === 'true';
  }

  next();
}
