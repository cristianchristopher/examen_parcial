import { Router } from "express";
import { insertarTarifario, listarTarifarios, obtenerTarifario, actualizarTarifario, darBajaTarifario } from "../controllers/tarifario.controller";




const router:Router = Router();

router.post('/',insertarTarifario);
router.get('/',listarTarifarios);
router.get('/:idTarifario',obtenerTarifario);
router.put('/:idTarifario',actualizarTarifario);
router.delete('/:idTarifario',darBajaTarifario);
export default router;