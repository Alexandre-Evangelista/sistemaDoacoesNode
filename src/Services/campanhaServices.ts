import { prisma } from "../Database/repository.js";
import { Campanha } from "../Models/registerCampanha.js";
export type UpdateCampanhaDTO = Partial<Omit<Campanha, "id">>;

export class CampanhaService {

  async criarCampanha(data: Campanha) {
    try {
      return await prisma.campanha.create({
        data: {
          nome: data.nome?? null,
          descricao: data.descricao,
          foto: data.foto,
          latitude: data.latitude ?? null,
          longitude: data.longitude ?? null,
          cnpjOng: data.cnpjOng ?? null,
        }
      });
    } catch (error) {
      console.error("Erro ao criar campanha:", error);
      throw error;
    }
  }

  async listarCampanhas() {
    return prisma.campanha.findMany({
      include: {
        ong: true,
        doacoes: true,
      }
    });
  }

  async buscarCampanhaPorId(id: string) {
    return prisma.campanha.findUnique({
      where: { id },
      include: {
        ong: true,
        doacoes: true,
      }
    });
  }

  async alterarFoto(id: string, foto: string) {
    return prisma.campanha.update({
      where: { id },
      data: { foto }
    });
  }

async atualizarCampanha(id: string, data: UpdateCampanhaDTO) {
  return prisma.campanha.update({
    where: { id },
    data
  });
}

  async deletarCampanha(id: string) {
    return prisma.campanha.delete({
      where: { id }
    });
  }
}
