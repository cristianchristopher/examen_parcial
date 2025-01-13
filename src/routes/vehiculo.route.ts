import { Router } from "express";
import { actualizarVehiculo, darBajaVehiculo, insertarVehiculo, listarVehiculos, obtenerVehiculo } from "../controllers/vehiculo.controller";


const router:Router = Router();

router.post('/',insertarVehiculo);
router.get('/',listarVehiculos);
router.get('/:idVehiculo',obtenerVehiculo);
router.put('/:idVehiculo',actualizarVehiculo);
router.delete('/:idVehiculo',darBajaVehiculo);
export default router;