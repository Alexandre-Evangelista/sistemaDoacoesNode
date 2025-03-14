import { CampanhaService } from "../Services/campanhaServices.js";
import { Campanha } from "../Models/registerCampanha.js";



const campanhaServices =new CampanhaService();


 class campanhaUseCases {
    async registerCampanha(campanha:Campanha){
        const campanhaExist = await campanhaServices.buscarCampanhaPorId(campanha.id);
        if(campanhaExist){
            throw new Error("Campanha já cadastrada.");
        }
        const newCampanha= await campanhaServices.criarCampanha(campanha);
        return{body:newCampanha,status:200};
    
    }

    async buscarCampanhaPorId(id:string){
        const campanha = await campanhaServices.buscarCampanhaPorId(id);
        if(!campanha){
            return {body: "Campanha não existe! ", status: 400}
        }
        return{body:campanha,status:200}
    }

    async mudarFoto(id: string,foto: string){
        const campanha = await campanhaServices.buscarCampanhaPorId(id);
        if(!campanha){
            return {body: "Campanha não existe! ", status: 400}
        }
        const campanhaAlterada = campanhaServices.alterarFoto(id,foto);
        return {body: campanhaAlterada, status:200 }
    }

    async buscarCampanhas(){
        const campanhas= campanhaServices.listarCampanhas();
        return {body:campanhas,status:200}
    }

    async updateCampanha(id:string,data:Omit<Campanha,"id">){
        const campanha = await campanhaServices.buscarCampanhaPorId(id);
        if(!campanha){
            return {body: "Campanha não existe! ", status: 400}
        }
        const upCampanha= await campanhaServices.atualizarCampanha(id,data);
        return{body:upCampanha,status:200}
    }
    async deletarCampanha(id:string){
        const campanha = await campanhaServices.buscarCampanhaPorId(id);
        if(!campanha){
            return {body: "Campanha não existe! ", status: 400}
        }
        const campanhadeletada= await campanhaServices.deletarCampanha(id);
        return {body:campanhadeletada,status:200}
    }

}
export default new campanhaUseCases();