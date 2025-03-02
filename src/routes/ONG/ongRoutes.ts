import { Router } from "express";
import { AutenticarOngToken } from "../../middlewares/ONG/authMiddleware.js";
import ONGController
 from "../../controllers/ONG/ONGController.js";

 const ongRouter = Router();
 const ongController = new ONGController()

 ongRouter.post("/ongs/registrar",ongController.registerOng)
 ongRouter.post("/ongs/login",ongController.login)
 ongRouter.get("/ongs",AutenticarOngToken, ongController.listarONGS);
 ongRouter.get("/ongs/:cnpj",AutenticarOngToken, ongController.buscarPorCnpj);
 ongRouter.put("/ongs/:cnpj",AutenticarOngToken, ongController.atualizarOng);
 ongRouter.delete("/ongs/:cnpj",AutenticarOngToken,ongController.deleteOng);



export default ongRouter;