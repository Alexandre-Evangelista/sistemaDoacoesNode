import { PrismaClient } from "@prisma/client/extension";
import { sign } from "jsonwebtoken";
import bcrypt,{ compare } from "bcryptjs";
import { ONG } from "../Models/Usuario/registerOng.js";
import { OngService } from "../Services/ongService.js";
const ongService = new OngService()
const prisma = new PrismaClient();

class OngUseCases {
    async registerOng(ong:ONG){
        const ongExist = await ongService.buscarOngPorCnpj(ong.cnpj);
        if(ongExist){
            throw new Error("ONG já cadastrada.");
        }
        ong.senha = await bcrypt.hash(ong.senha, 10);
        const newong = await ongService.criarOng(ong);

        return {body: newong, status:200};
    }

    async login (cnpj: string, senha:string){
        const ong = await ongService.buscarOngPorCnpj(cnpj);
        if(!ong){
            return {body: "ONG nao existe! ", status: 400}
        }
        const verifyPassword = compare(senha,ong.senha);
        if(!verifyPassword){
            return {body: "Senha incorreta!", status: 400};
        }
        const token = sign({cpnj: ong.cnpj }, process.env.JWT_SECRET as string,{expiresIn: "1d"})

        return {body:token, status:200 }
    }

    async buscarOngPorCnpj(cnpj:string) {
        const ong = await ongService.buscarOngPorCnpj(cnpj);
        if(!ong){
            return {body: "ONG nao existe! ", status: 400}
        }
        return{body:ong, status:200};
    }

    async buscarOngs() {
        const ongs = await ongService.listarOngs();
        return { body: ongs, status: 200};
    }

    async updateOng(cnpj: string,data: Omit<ONG, "cnpj">){
        const ong = await ongService.buscarOngPorCnpj(cnpj);
        if(!ong){
            return {body: "ONG nao existe! ", status: 400}
        }
        const updatedOng = await ongService.atualizarOng(cnpj,data);
        return {body:updatedOng, status: 200}
    }

    async deletarOng(cnpj: string) {
        const ong = await ongService.buscarOngPorCnpj(cnpj);
        
        if( !ong ){
            return {body: "ONG nao encontrada!", status: 400}
        }
        const ongDelete = await ongService.deletarOng(cnpj)
        return {body: ongDelete, status: 200};
        
    }

}

export default new OngUseCases();