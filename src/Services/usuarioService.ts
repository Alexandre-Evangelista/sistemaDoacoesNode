import { prisma } from "../Database/repository.js";
import { Usuario } from "../Models/Usuario/registerUsuario.js";

export class UsuarioService{
    async criarUsuario(data:Usuario){
        console.log("🔍 Dados do usuario antes da criação:", data);
      data.geolocalizacao?.coordinates[0]
      const geolocalizacao = data.geolocalizacao? JSON.stringify(data.geolocalizacao)  : null;
      try{
        return await prisma.usuario.create({data:{
            email: data.email,
            foto: data.foto ?? null,
            tipo: data.tipo ?? null,
            senha: data.senha ,
            telefone: data.telefone ?? null,
            nome: data.nome ,
            cpf: data.cpf?? null,
            cnpj: data.cnpj ?? null,
            latitude: data.geolocalizacao?.coordinates[1],
            longitude: data.geolocalizacao?.coordinates[0],
            avaliacoes: { create: [] },
            doacoes: { create: [] },
        }});
      }catch (error) {
        console.error('Erro ao criar usuario:', error);
        throw error;
      }
    } 
    async listarUsuarios(){
        return await prisma.usuario.findMany();
    }
    async buscarUsuarioPorEmail(email:string){
        return await prisma.usuario.findUnique({where:{email}});
    }
    async atualizarUsuario(email:string,data:Omit<Usuario,"email">){
        return await prisma.usuario.update({where:{email},data});
    }
    async deletarUsuario(email:string){
        return await prisma.usuario.delete({where:{email}});
    }
}