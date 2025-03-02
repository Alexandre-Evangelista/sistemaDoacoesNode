import { prisma } from "../Database/repository.js";
import { ONG } from "../Models/Usuario/registerOng.js";

export class OngService {
    async criarOng(data: { 
        cnpj: string; 
        nome: string;
        geolocalizacao?:object; 
        foto?: string ; 
        descricao?: string; 
        telefone: string ;
        senha: string
    }) {
      return await prisma.oNG.create({ data });
    }
  
    async listarOngs() {
      return await prisma.oNG.findMany();
    }
  
    async buscarOngPorCnpj(cnpj: string) {
      return await prisma.oNG.findUnique({ where: { cnpj } });
    }
  
    async atualizarOng(cnpj: string, data: Omit<ONG,"cnpj">) {
      return await prisma.oNG.update({ where: { cnpj }, data });
    }
  
    async deletarOng(cnpj: string) {
      return await prisma.oNG.delete({ where: { cnpj } });
    }
  }