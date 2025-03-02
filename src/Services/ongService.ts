import {prisma}  from "../Database/repository.js";
import { ONG } from "../Models/Usuario/registerOng.js";


export class OngService {
    async criarOng(data:ONG) {
      console.log("🔍 Dados da ONG antes da criação:", data);
      data.geolocalizacao?.coordinates[0]
      const geolocalizacao = data.geolocalizacao? JSON.stringify(data.geolocalizacao)  : null;
      try {
      return await prisma.oNG.create({ data: { 
          cnpj: data.cnpj,
          nome: data.nome,
          senha: data.senha,
          telefone: data.telefone,
          descricao: data.descricao ?? null,
          foto: data.foto ?? null,
          latitude: data.geolocalizacao?.coordinates[1],
          longitude: data.geolocalizacao?.coordinates[0],
          campanhas: { create: [] },
          avaliacoes: { create: [] },
          doacoes: { create: [] },
        } 
      });
    } catch (error) {
      console.error('Erro ao criar ONG:', error);
      throw error;
    }

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