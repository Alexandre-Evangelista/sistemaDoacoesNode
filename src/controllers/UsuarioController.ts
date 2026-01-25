import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";  
import usuarioUseCases from "../usecases/usuarioUseCase.js";
import bcrypt from "bcryptjs";
import { Usuario } from "../Models/Usuario/registerUsuario.js";
import { validateZodUser } from "../utils/userValidation.js";

const prisma = new PrismaClient();

interface CustomRequest extends Request {
  userEmail?: string;
}
class UsuarioController{
     async registerUsuario(req:Request,res:Response){
       try{ 
            
            let { email,tipo,cnpj, nome, senha, telefone, foto, geolocalizacao,cpf } = req.body as Usuario;
            
            const resultValidation = validateZodUser(req.body);
            if (!resultValidation.success) {
              
              const errorMessages = resultValidation.error.format();
              return res.status(400).json(errorMessages)
            }
            if(req.file){
              const imagesRequest = req.file as Express.Multer.File
              const imagesPath = imagesRequest.filename
              foto = imagesPath
              console.log("foto: ",{ email,tipo,cnpj, nome, senha, telefone, foto, geolocalizacao,cpf})
            }       
            const user = await usuarioUseCases.registerUsuario({ email,tipo,cnpj, nome, senha, telefone, foto, geolocalizacao });
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
      return res.status(login.status).json(login.body);
    } catch (error) {
      return res.status(401).json({error});
    }
  }
  async listarUsuarios(req: Request, res: Response) {
    const user = await usuarioUseCases.buscarUsuarios();
    return res.status(user.status).json(user.body);
  }

  async buscarPorEmail(req: CustomRequest, res: Response) {
    const { email } = req.params;
    const token = req.userEmail
    if(token != email){
      return res.status(403).json("Acesso Negado!")
    }

    const user = await usuarioUseCases.buscarUsuarioPorEmail(email);
    return res.status(user.status).json(user.body);
  }
  async atualizarFoto(req: CustomRequest, res: Response){
      const {email} = req.params
      const token = req.userEmail
    if(token != email){
      res.status(403).json("Acesso Negado!")
    }
      if(!req.file){
        return res.status(400).json("Erro ao informar o arquivo")
      }
      const fileName = req.file.filename;
      const user = await usuarioUseCases.mudarFoto(email,fileName);
      return res.status(user.status).json(user.body);
      
    }

  async deleteUsuario(req:CustomRequest, res: Response){
    
    const {email} = req.params
    const token = req.userEmail
    if(token != email){
      console.log(token)
      return res.status(403).json("Acesso Negado!")
    }
    const user = await usuarioUseCases.deleteUsuario(email);
     return res.status(user.status).json(user.body);

  }
  async atualizarUsuario(req:CustomRequest, res: Response){
    const { email } = req.params;
    const token = req.userEmail
    if(token != email){

      return res.status(403).json("Acesso Negado!")
    }
    const data = req.body;
    data.senha = await bcrypt.hash(data.senha, 10);
    const result = await usuarioUseCases.updateUsuario(email,data);
    return res.status(result.status).json(result.status);
  }

}

export default UsuarioController;