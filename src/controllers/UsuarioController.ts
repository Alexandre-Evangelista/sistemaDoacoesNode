import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";  
import usuarioUseCases from "../usecases/usuarioUseCase.js";
import bcrypt from "bcryptjs";
import { Usuario } from "../Models/Usuario/registerUsuario.js";

const prisma = new PrismaClient();

class UsuarioController{
     async registerUsuario(req:Request,res:Response){
       try{ 
            let { email,tipo,cnpj, nome, senha, telefone, foto, geolocalizacao,cpf } = req.body as Usuario;
            if(req.file){
              const imagesRequest = req.file as Express.Multer.File
              const imagesPath = imagesRequest.filename
              foto = imagesPath
              console.log("foto: ",{ email,tipo,cnpj, nome, senha, telefone, foto, geolocalizacao,cpf})
            }       
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
  async atualizarFoto(req: Request, res: Response){
      const {email} = req.params
      if(!req.file){
        return res.status(400).json("Erro ao informa o arquivo")
      }
      const fileName = req.file.filename;
      const user = await usuarioUseCases.mudarFoto(email,fileName);
      return res.status(user.status).json(user.body);
      
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