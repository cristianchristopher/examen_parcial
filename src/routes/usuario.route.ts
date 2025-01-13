import { Router } from "express";
import { actualizarUsuario, darBajaUsuario, insertarUsuario, listarUsuario, obtenerUsuario } from "../controllers/usuario.controller";



const router:Router = Router();

router.post('/',insertarUsuario);
router.get('/',listarUsuario);
router.get('/:idUsuario',obtenerUsuario);
router.put('/:idUsuario',actualizarUsuario);
router.delete('/:idUsuario',darBajaUsuario);
export default router;