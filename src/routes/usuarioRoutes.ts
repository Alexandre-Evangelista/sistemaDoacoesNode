import { Router } from "express";
import UsuarioController
 from "../controllers/UsuarioController.js";

 const usuarioRouter = Router();
 const usuarioController = new UsuarioController()

 usuarioRouter.post("/usuario/registrar",usuarioController.registerUsuario)
 usuarioRouter.post("/usuario/login",usuarioController.login)
 usuarioRouter.get("/usuario", usuarioController.listarUsuarios);
 usuarioRouter.get("/usuario/:email",usuarioController.buscarPorEmail);
 usuarioRouter.put("/usuario/:email", usuarioController.atualizarUsuario);
 usuarioRouter.delete("/usuario/:email",usuarioController.deleteUsuario);



export default usuarioRouter;