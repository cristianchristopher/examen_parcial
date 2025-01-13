import { Router } from "express";
import { actualizarTrabajador, darBajaTrabajador, insertarTrabajador, listarTrabajador, obtenerTrabajador } from "../controllers/trabajador.controller";



const router:Router = Router();

router.post('/',insertarTrabajador);
router.get('/',listarTrabajador);
router.get('/:idTrabajador',obtenerTrabajador);
router.put('/:idTrabajador',actualizarTrabajador);
router.delete('/:idTrabajador',darBajaTrabajador);
export default router;