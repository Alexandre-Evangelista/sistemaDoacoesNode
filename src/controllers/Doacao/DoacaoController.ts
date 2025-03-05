import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";  
import doacoesUseCases from "../../usecases/doacoesUseCases.js";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();


class DoacaoController{
    async criarDoacao(req:Request, res:Response) {
       try{
        let data = req.body as Doacao
        const doacao = await doacoesUseCases.criarDoacao(data);
        return res.status(doacao.status).json(doacao.body)
       }catch(error){
            return res.status(400).json("error: "+error);
       }
    }

    async listarDoacoes(req:Request, res:Response){
        const email = (req as any).userEmail
        
        if(!email){
            return res.status(400).json("Email Não Encontrado")
        }
        const doacao = await doacoesUseCases.listarDoacoesUsuario(email);
        if(!doacao){
            return res.status(404).json("Doeações nao Encontradas")
        }
        return res.status(doacao.status).json(doacao.body)
    }

    async buscarDoacao(req:Request, res:Response){
        const email = (req as any).userEmail
        const { id } = req.params
        if(!email || !id){
            return res.status(400).json("Requisição invalida")
        }
        const doacao = await doacoesUseCases.listarDoacao(id,email);
        if(!doacao){
            return res.status(404).json("Doeações nao Encontradas")
        }
        return res.status(doacao.status).json(doacao.body)
    }

    async updateDoacao(req: Request, res: Response){
        const email = (req as any).userEmail
        const { id } = req.params
        const data = req.body as Doacao
        if(!email || !id){
            return res.status(400).json("Requisição invalida")
        }
        const doacao = await doacoesUseCases.atualizarDoacao(id,email,data)
        if(!doacao){
            return res.status(404).json("Doeações nao Encontradas")
        }
        return res.status(doacao.status).json(doacao.body)
    }

    async deleteDoacao(req: Request, res: Response){
        const email = (req as any).userEmail
        const {id} = req.params
        if(!email || !id){
           return res.status(400).json("Requisição invalida")
        }
        const doacao = await doacoesUseCases.deleteDoacao(email,id);
        return res.status(doacao.status).json(doacao.body)

    }

}

export default new DoacaoController();