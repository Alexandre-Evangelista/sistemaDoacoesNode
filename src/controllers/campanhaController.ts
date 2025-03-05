import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"; 
import campanhaUseCases from "../usecases/campanhaUseCases.js";
import { Campanha } from "../Models/registerCampanha.js";

const prisma = new PrismaClient();

 class CampanhaController{
    async registerCampanha(req:Request,res:Response){
        try{
            let { id, descricao, foto, geolocalizacao } = req.body as Campanha;
            if(req.file){
                const imagesRequest = req.file as Express.Multer.File
                const imagesPath = imagesRequest.filename
                foto = imagesPath
                console.log("foto: ",{id, descricao, foto, geolocalizacao })
              }
              const campanha =await campanhaUseCases.registerCampanha({ id, descricao, foto, geolocalizacao });
              return  res.status(campanha.status).json(campanha.body)
        }
        catch (error){
            return res.status(400).json(error)
        }     
    }
    async listarCampanhas(req: Request, res: Response){
        const campanha= await campanhaUseCases.buscarCampanhas()
        return res.status(campanha.status).json(campanha.body);
    }

    async buscarPorId(req: Request, res: Response){
        const { id } = req.params;
        const campanha= await campanhaUseCases.buscarCampanhaPorId(id);
        return res.status(campanha.status).json(campanha.body);
    }

    async atualizarFoto(req: Request, res: Response){
    const {id} = req.params;
    if(!req.file){
      return res.status(400).json("Erro ao informa o arquivo")
    }
    const fileName = req.file.filename;
    const campanha = await campanhaUseCases.mudarFoto(id,fileName);
    return res.status(campanha.status).json(campanha.body);
    
    }

    async deleteCampanhas(req: Request, res: Response){
        const {id} = req.params;
        const campanha= await campanhaUseCases.deletarCampanha(id);
        return res.status(campanha.status).json(campanha.body);
    }

    async atualizarCampanhas(req: Request, res: Response){
        const {id} = req.params
        const data= req.body;
        const campanha= await campanhaUseCases.updateCampanha(id,data)
        return res.status(campanha.status).json(campanha.body);
    }
}export default CampanhaController;