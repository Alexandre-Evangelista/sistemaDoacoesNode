import { prisma } from "../Database/repository.js";
import { Usuario } from "../Models/Usuario/registerUsuario.js";

export class UsuarioService{
    async criarUsuario(data:{
        email: string;
        geolocalizacao?:object; 
        foto?: string | null;
        tipo?: boolean | null;
        senha: string;
        telefone?: string | null;
        nome: string;
        cpf?: string | null;
        cnpj?: string | null;
    }){
        return await prisma.usuario.create({data});
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