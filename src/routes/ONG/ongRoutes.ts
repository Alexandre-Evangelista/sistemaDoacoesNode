import { Router } from "express";
import multer from "multer";
import uploadMulter from "../../config/uploadMulter.js";
import { AutenticarOngToken } from "../../middlewares/ONG/authMiddleware.js";
import ONGController
 from "../../controllers/ONG/ONGController.js";

 const ongRouter = Router();
 const ongController = new ONGController()
 const upload = multer(uploadMulter.upload("images/ong"))
 



 ongRouter.post("/ongs/registrar",upload.single("foto"),ongController.registerOng)
 ongRouter.post("/ongs/login",ongController.login)
 ongRouter.get("/ongs",AutenticarOngToken, ongController.listarONGS);
 ongRouter.patch("/ongs/:cnpj/foto",AutenticarOngToken,upload.single("foto"),ongController.atualizarFoto)
 ongRouter.get("/ongs/:cnpj",AutenticarOngToken, ongController.buscarPorCnpj);
 ongRouter.put("/ongs/:cnpj",AutenticarOngToken, ongController.atualizarOng);
 ongRouter.delete("/ongs/:cnpj",AutenticarOngToken,ongController.deleteOng);


export default ongRouter;