import { CampanhaService } from "../Services/campanhaServices.js";
import { Campanha } from "../Models/registerCampanha.js";
import { UpdateCampanhaDTO } from "../Services/campanhaServices.js";
const campanhaServices = new CampanhaService();

class CampanhaUseCases {

  async registerCampanha(campanha: Campanha) {
    const newCampanha = await campanhaServices.criarCampanha(campanha);
    return { body: newCampanha, status: 201 };
  }

  async buscarCampanhaPorId(id: string) {
    const campanha = await campanhaServices.buscarCampanhaPorId(id);
    if (!campanha) {
      return { body: "Campanha não existe!", status: 404 };
    }
    return { body: campanha, status: 200 };
  }

  async mudarFoto(id: string, foto: string) {
    const campanha = await campanhaServices.buscarCampanhaPorId(id);
    if (!campanha) {
      return { body: "Campanha não existe!", status: 404 };
    }

    const campanhaAlterada = await campanhaServices.alterarFoto(id, foto);
    return { body: campanhaAlterada, status: 200 };
  }

  async buscarCampanhas() {
    const campanhas = await campanhaServices.listarCampanhas();
    return { body: campanhas, status: 200 };
  }

  async updateCampanha(id: string, data: UpdateCampanhaDTO) {
  const campanha = await campanhaServices.buscarCampanhaPorId(id);
  if (!campanha) {
    return { body: "Campanha não existe!", status: 404 };
  }

  const upCampanha = await campanhaServices.atualizarCampanha(id, data);
  return { body: upCampanha, status: 200 };
}


  async deletarCampanha(id: string) {
    const campanha = await campanhaServices.buscarCampanhaPorId(id);
    if (!campanha) {
      return { body: "Campanha não existe!", status: 404 };
    }

    const campanhaDeletada = await campanhaServices.deletarCampanha(id);
    return { body: campanhaDeletada, status: 200 };
  }
}

export default new CampanhaUseCases();
