import { PrismaClient } from "@prisma/client/extension";
import { sign } from "jsonwebtoken";
import bcrypt,{ compare } from "bcryptjs";
import { Usuario} from "../Models/Usuario/registerUsuario.js";
import { UsuarioService } from "../Services/usuarioService.js";
const usuarioService = new UsuarioService()
const prisma = new PrismaClient();

class UsuarioUseCases{
    async registerUsuario(user:Usuario){
        const userExist= await usuarioService.buscarUsuarioPorEmail(user.email);
        if (userExist){
        throw new Error("Usuario já cadastrado");
        }
        user.senha = await bcrypt.hash(user.senha,10);
        const newUser = await usuarioService.criarUsuario(user);
        return {body: newUser, status:200};
        }

    async login(email:string,senha:string){
        const user = await usuarioService.buscarUsuarioPorEmail(email);
        if(!user){
        return {body: "Usuário não existe! ", status: 400}
        }
        const verifyPassword = await compare(senha,user.senha);
        if(!verifyPassword){
        return {body:"senha incorreta",status:400}
        }
        const token= sign({email:user.email},process.env.JWT_SECRET as string,{expiresIn:"1d"});
        return {body:token,status:200}
        }

        async buscarUsuarioPorEmail(email:string){
            const user = await usuarioService.buscarUsuarioPorEmail(email);
            if (!user) {
              return { body: "Usuario não existe", status: 400 };
            }
            return{body:user,status:200};
        }

        async buscarUsuarios() {
            const user = await usuarioService.listarUsuarios()
            return { body: user, status: 200};
        }
        async updateUsuario(email:string,data:Omit<Usuario,"email">){
            const user= await usuarioService.buscarUsuarioPorEmail(email);
            if(!user){
                return{body:"Usuario nao existe", status:400}
            }
            const updateUser= await usuarioService.atualizarUsuario(email,data);
            return {body:updateUser,status:200}
        }
        async deleteUsuario(email:string){
            const user= await usuarioService.buscarUsuarioPorEmail(email);
            if(!user){
                return {body:"Usuario nao existe", status:400}
            }
            const userDelete = await usuarioService.deletarUsuario(email);
            return{body:userDelete,status:200}
        }
}
export default new UsuarioUseCases();