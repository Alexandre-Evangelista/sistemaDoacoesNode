import { Router } from "express";
import multer from "multer";
import uploadMulter from "../config/uploadMulter.js";
import { AutenticarUsuarioToken } from "../middlewares/ONG/authMiddlewareUser.js";
import UsuarioController
 from "../controllers/UsuarioController.js";

 const usuarioRouter = Router();
 const usuarioController = new UsuarioController()
 const upload = multer(uploadMulter.upload("images/ong"))

 usuarioRouter.post("/usuario/registrar",upload.single("foto"),usuarioController.registerUsuario)
 usuarioRouter.post("/usuario/login",usuarioController.login)
 usuarioRouter.get("/usuario",AutenticarUsuarioToken, usuarioController.listarUsuarios);
 usuarioRouter.patch("/usuario/:email/foto",AutenticarUsuarioToken,upload.single("foto"),usuarioController.atualizarFoto);
 usuarioRouter.get("/usuario/:email",AutenticarUsuarioToken,usuarioController.buscarPorEmail);
 usuarioRouter.put("/usuario/:email",AutenticarUsuarioToken, usuarioController.atualizarUsuario);
 usuarioRouter.delete("/usuario/:email",AutenticarUsuarioToken,usuarioController.deleteUsuario);


export default usuarioRouter;