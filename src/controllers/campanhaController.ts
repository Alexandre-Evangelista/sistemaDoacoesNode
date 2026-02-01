import { Request, Response } from "express";
import campanhaUseCases from "../usecases/campanhaUseCases.js";
import { Campanha } from "../Models/registerCampanha.js";



class CampanhaController {

  async registerCampanha(req: Request, res: Response) {
    try {
      let { descricao,nome, latitude, longitude, cnpjOng } = req.body as Campanha;
      let foto: string;

      if (req.file) {
        foto = req.file.filename;
      } else {
        return res.status(400).json("Foto é obrigatória");
      }

      const campanha = await campanhaUseCases.registerCampanha({
        descricao,
        foto,
        nome,
        latitude: latitude ? Number(latitude) : undefined,
        longitude: longitude ? Number(longitude) : undefined,
        cnpjOng,
      });

      return res.status(campanha.status).json(campanha.body);
    } catch (error) {
      console.error(error);
      return res.status(400).json(error);
    }
  }

  async listarCampanhas(req: Request, res: Response) {
    const campanha = await campanhaUseCases.buscarCampanhas();
    return res.status(campanha.status).json(campanha.body);
  }

  async buscarPorId(req: Request, res: Response) {
    const { id } = req.params;
    const campanha = await campanhaUseCases.buscarCampanhaPorId(id);
    return res.status(campanha.status).json(campanha.body);
  }

  async atualizarFoto(req: Request, res: Response) {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json("Erro ao informar o arquivo");
    }

    const fileName = req.file.filename;
    const campanha = await campanhaUseCases.mudarFoto(id, fileName);

    return res.status(campanha.status).json(campanha.body);
  }

  async atualizarCampanhas(req: Request, res: Response) {
    const { id } = req.params;
    const { descricao, latitude, longitude, cnpjOng } = req.body;

    const campanha = await campanhaUseCases.updateCampanha(id, {
      descricao,
      latitude: latitude ? Number(latitude) : undefined,
      longitude: longitude ? Number(longitude) : undefined,
      cnpjOng,
    });

    return res.status(campanha.status).json(campanha.body);
  }

  async deleteCampanhas(req: Request, res: Response) {
    const { id } = req.params;
    const campanha = await campanhaUseCases.deletarCampanha(id);
    return res.status(campanha.status).json(campanha.body);
  }
}

export default new CampanhaController();
