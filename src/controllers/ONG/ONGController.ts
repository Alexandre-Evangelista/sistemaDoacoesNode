import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";  
import ongUseCases from "../../usecases/ongUseCases.js";
import bcrypt from "bcryptjs";
import { CreateONG } from "../../Models/Usuario/registerOng.js";
import { validateZodOng } from "../../utils/ongValidation.js";
const prisma = new PrismaClient();
interface CustomRequest extends Request {
  ongCnpj?: string;
}
class OngCotroller{
     async registerOng(req:Request,res:Response){
       try{ 
            let { cnpj, nome, senha, telefone, descricao, foto, geolocalizacao } = req.body as CreateONG;
             const resultValidation = validateZodOng(req.body);

            if (!resultValidation.success) {   
     
              const errorMessages = resultValidation.error.format();
              return res.status(400).json(errorMessages)
            }
            if(req.file){
              const imagesRequest = req.file as Express.Multer.File
              const imagesPath = imagesRequest.filename
              foto = imagesPath
              console.log("foto: ",{ cnpj, nome, senha, telefone, descricao, foto, geolocalizacao })
            }
            const ong = await ongUseCases.registerOng({ cnpj, nome, senha, telefone, descricao, foto, geolocalizacao });
            return res.status(ong.status).json(ong.body)
        }
        catch(error){
            res.status(400).json(error)
        }        
    }

   async login(req: Request, res: Response) {
    try {
      const { cnpj, senha } = req.body;
      const login = await ongUseCases.login(cnpj, senha);
      return res.status(login.status).json(login.body);
    } catch (error) {
      return res.status(401).json({error});
    }
  }
  async listarONGS(req: Request, res: Response) {
    const ongs = await ongUseCases.buscarOngs();
    return res.status(ongs.status).json(ongs.body);
  }

  async buscarPorCnpj(req: CustomRequest, res: Response) {
    const { cnpj } = req.params;
    const token = (req as any).ongCnpj
    if(token != cnpj){
     return res.status(403).json("Acesso Negado");
    }
    const ong = await ongUseCases.buscarOngPorCnpj(cnpj);
    return res.status(ong.status).json(ong.body);
  }

  async atualizarFoto(req: Request, res: Response){
    const {cnpj} = req.params
    const token = (req as any).ongCnpj
    if(token != cnpj){
     return res.status(403).json("Acesso Negado");
    }
    if(!req.file){
      return res.status(400).json("Erro ao informa o arquivo")
    }
    const fileName = req.file.filename;
    const ong = await ongUseCases.mudarFoto(cnpj,fileName);
    return res.status(ong.status).json(ong.body);
    
  }

  async deleteOng(req:Request, res: Response){
    const {cnpj} = req.params
    const token = (req as any).ongCnpj
    if(token != cnpj){
     return res.status(403).json("Acesso Negado");
    }
    const ong = await ongUseCases.deletarOng(cnpj);
    return res.status(ong.status).json(ong.body);

  }
  async atualizarOng(req:Request, res: Response){
    const { cnpj } = req.params;
    const data = req.body;
    data.senha = await bcrypt.hash(data.senha, 10);
    const result = await ongUseCases.updateOng(cnpj,data);
    return res.status(result.status).json(result.status);
  }

}

export default OngCotroller;