import {prisma}  from "../Database/repository.js";
import { Campanha } from "../Models/registerCampanha.js";
 export class CampanhaService{
    async criarCampanha(data:Campanha){
        console.log(data)
        data.geolocalizacao?.coordinates[0]
        const geolocalizacao = data.geolocalizacao?JSON.stringify(data.geolocalizacao):null;
        
        try{
            return await prisma.campanha.create({data:{
                descricao:data.descricao,
                foto: data.foto ?? null,
                latitude: data.geolocalizacao?.coordinates[1],
                longitude: data.geolocalizacao?.coordinates[0],
                doacoes: { create: [] },
            }
                
            });
        }catch(error) {
            console.error('Erro ao criar Campanha:', error);
            throw error;
          }     
    }
    async listarCampanhas(){
        return prisma.campanha.findMany();
      }

    async alterarFoto(id: string, foto: string){
        const campanha = await prisma.campanha.update({
          where: { id },
          data: { foto }
      });
  
      return campanha;
  
      }
    async buscarCampanhaPorId(id:string){
        return prisma.campanha.findUnique({where:{id}});
    }

    async atualizarCampanha(id: string, data: Omit<Campanha,"id">){
        return prisma.campanha.update({where:{id},data})
    }
    
    async deletarCampanha(id: string){
        return await prisma.campanha.delete({where:{id}});
    }
 }