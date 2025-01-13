
import { Router } from "express";
import { actualizarCliente, darBajaCliente, insertarCliente, listarClientes, obtenerCliente } from "../controllers/cliente.controller";



const router:Router = Router();

router.post('/',insertarCliente);
router.get('/',listarClientes);
router.get('/:idCliente',obtenerCliente);
router.put('/:idCliente',actualizarCliente);
router.delete('/:idCliente',darBajaCliente);
export default router;
