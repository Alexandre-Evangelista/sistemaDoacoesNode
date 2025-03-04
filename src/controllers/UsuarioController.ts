import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";  
import usuarioUseCases from "../usecases/usuarioUseCase.js";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

class UsuarioController{
     async registerUsuario(req:Request,res:Response){
       try{ 
            const { email,tipo,cnpj, nome, senha, telefone, foto, geolocalizacao,cpf } = req.body as Usuario;       
            const user = await usuarioUseCases.registerUsuario({ email,tipo,cnpj, nome, senha, telefone,senha, foto, geolocalizacao });
            res.status(user.status).json(user.body)
        }
        catch(error){
            res.status(400).json(error)
        }        
    }

   async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;
      const login = await usuarioUseCases.login(email, senha);
      res.status(login.status).json(login.body);
    } catch (error) {
      res.status(401).json({error});
    }
  }
  async listarUsuarios(req: Request, res: Response) {
    const user = await usuarioUseCases.buscarUsuarios();
    res.status(user.status).json(user.body);
  }

  async buscarPorEmail(req: Request, res: Response) {
    const { email } = req.params;
    const user = await usuarioUseCases.buscarUsuarioPorEmail(email);
    res.status(user.status).json(user.body);
  }

  async deleteUsuario(req:Request, res: Response){
    const {email} = req.params
    const user = await usuarioUseCases.deleteUsuario(email);
    res.status(user.status).json(user.body);

  }
  async atualizarUsuario(req:Request, res: Response){
    const { email } = req.params;
    const data = req.body;
    data.senha = await bcrypt.hash(data.senha, 10);
    const result = await usuarioUseCases.updateUsuario(email,data);
    res.status(result.status).json(result.status);
  }

}

export default UsuarioController;