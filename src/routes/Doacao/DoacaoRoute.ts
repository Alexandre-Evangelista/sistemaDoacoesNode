import { Router } from "express";
import doacaoController from "../../controllers/Doacao/DoacaoController.js";
import { AutenticarUsuarioToken } from "../../middlewares/ONG/authMiddlewareUser.js";


const doacaoRouter = Router();


doacaoRouter.post("/doacao/usuario",AutenticarUsuarioToken,doacaoController.criarDoacao)
doacaoRouter.get("/doacao/usuario",AutenticarUsuarioToken,doacaoController.listarDoacoes)
doacaoRouter.get("/doacao/usuario/:id",AutenticarUsuarioToken,doacaoController.buscarDoacao)
doacaoRouter.put("/doacao/usuario/:id",AutenticarUsuarioToken,doacaoController.updateDoacao)
doacaoRouter.delete("/doacao/usuario/:id",AutenticarUsuarioToken,doacaoController.deleteDoacao)

export default doacaoRouter