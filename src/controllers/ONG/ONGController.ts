import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";  
import ongUseCases from "../../usecases/ongUseCases.js";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

class OngCotroller{
     async registerOng(req:Request,res:Response){
       try{ 
            const { cnpj, nome, senha, telefone, descricao, foto, geolocalizacao } = req.body as ONG;
            const ong = await ongUseCases.registerOng({ cnpj, nome, senha, telefone, descricao, foto, geolocalizacao });
            res.status(ong.status).json(ong.body)
        }
        catch(error){
            res.status(400).json(error)
        }        
    }

   async login(req: Request, res: Response) {
    try {
      const { cnpj, senha } = req.body;
      const login = await ongUseCases.login(cnpj, senha);
      res.status(login.status).json(login.body);
    } catch (error) {
      res.status(401).json({error});
    }
  }
  async listarONGS(req: Request, res: Response) {
    const ongs = await ongUseCases.buscarOngs();
    res.status(ongs.status).json(ongs.body);
  }

  async buscarPorCnpj(req: Request, res: Response) {
    const { cnpj } = req.params;
    const ong = await ongUseCases.buscarOngPorCnpj(cnpj);
    res.status(ong.status).json(ong.body);
  }

  async deleteOng(req:Request, res: Response){
    const {cnpj} = req.params
    const ong = await ongUseCases.deletarOng(cnpj);
    res.status(ong.status).json(ong.body);

  }
  async atualizarOng(req:Request, res: Response){
    const { cnpj } = req.params;
    const data = req.body;
    data.senha = await bcrypt.hash(data.senha, 10);
    const result = await ongUseCases.updateOng(cnpj,data);
    res.status(result.status).json(result.status);
  }

}

export default OngCotroller;