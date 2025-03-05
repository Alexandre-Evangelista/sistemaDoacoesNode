
import doacaoService from "../Services/doacaoService.js";


class doacoesUseCases{
    async criarDoacao(data: Doacao){
        
        const newDoacao = await doacaoService.criarDoacao(data);
        if(!newDoacao){
            return {body: "Nao foi possivel cadastrar com os dados", status: 400 }
        }
        return {body:newDoacao, status:200}
    }

    async listarDoacoesUsuario(email:string ){
        const doacoes = await doacaoService.buscarDoacaoDoUsuario(email);
        if(!doacoes){
            return {body:"Nao existe doações de usuario", status: 404}
        }
        return {body:doacoes, status: 200}
    }
    
    async listarDoacao(email:string, id:string ){
        const doacoes = await doacaoService.buscarDoacaoPorId(id,email);
        if(!doacoes){
            return {body:"Doacao nao encontrada", status: 404}
        }
        return {body:doacoes, status: 200}
    }

    async atualizarDoacao(id: string, email:string, data: Omit<Doacao,"id"|"email">){
        const doacao = await doacaoService.buscarDoacaoPorId(id,email);
        if(!doacao){
            return {body: "Doação do usuario nao existe", status: 404}
        }
        const Newdoacao = await doacaoService.updateDoacao(id,email,data);
        if(!Newdoacao){
            return {body: "Nao foi possivel realizar atualizar doaçao", status: 400}
        }
        return {body: Newdoacao, status: 200}
    }
    async deleteDoacao(email:string, id: string){

        const doacao = await doacaoService.buscarDoacaoPorId(id,email)
        if(!doacao){
            return {body: "Doação do usuario nao existe", status: 404}
        }
        const deleteDoacao = await doacaoService.deletarDoacao(id);
        return {body:deleteDoacao, status: 200}
    }



}

export default new doacoesUseCases();