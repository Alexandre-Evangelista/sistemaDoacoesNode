import { Router } from "express";
import multer from "multer";
import uploadMulter from "../config/uploadMulter.js";
import CampanhaController from "../controllers/campanhaController.js";


const campanhaRouter = Router();
 const campanhaController = new CampanhaController();
 const upload = multer(uploadMulter.upload("images/ong"));

 campanhaRouter.post("/campanha/registar",upload.single("foto"),campanhaController.registerCampanha);
 campanhaRouter.get("/campanha",campanhaController.listarCampanhas);
 campanhaRouter.get("/campanha/:id",campanhaController.buscarPorId);
 campanhaRouter.patch("/campanha/:id/foto",upload.single("foto"),campanhaController.atualizarFoto);
 campanhaRouter.put("/campanha/:id",campanhaController.atualizarCampanhas);
 campanhaRouter.delete("/campanha/:id",campanhaController.deleteCampanhas);
 

 export default campanhaRouter;