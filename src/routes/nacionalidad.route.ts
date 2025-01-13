import { Router } from "express";
import { actualizarNacionalidad, darBajaNacionalidad, insertarNacionalidad, listarNacionalidades, obtenerNacionalidad } from "../controllers/nacionalidad.controller";


const router:Router=Router();

router.post('/',insertarNacionalidad);
router.get('/',listarNacionalidades);
router.get('/:idNacionalidad',obtenerNacionalidad);
router.put('/:idNacionalidad',actualizarNacionalidad);
router.delete('/:idNacionalidad',darBajaNacionalidad);
export default router;