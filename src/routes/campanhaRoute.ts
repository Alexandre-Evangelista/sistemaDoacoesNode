import { Router } from "express";
import multer from "multer";
import uploadMulter from "../config/uploadMulter.js";
import campanhaController from "../controllers/campanhaController.js";
import { parseMultipart } from "../middlewares/multipartMidleware.js";


const campanhaRouter = Router();
 
 const upload = multer(uploadMulter.upload("images/ong"));

 campanhaRouter.post("/campanha/registar",upload.single("foto"),parseMultipart,campanhaController.registerCampanha);
 campanhaRouter.get("/campanha",campanhaController.listarCampanhas);
 campanhaRouter.get("/campanha/:id",campanhaController.buscarPorId);
 campanhaRouter.patch("/campanha/:id/foto",upload.single("foto"),campanhaController.atualizarFoto);
 campanhaRouter.put("/campanha/:id",campanhaController.atualizarCampanhas);
 campanhaRouter.delete("/campanha/:id",campanhaController.deleteCampanhas);
 

 export default campanhaRouter;