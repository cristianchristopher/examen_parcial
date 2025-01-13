import { Movimiento } from "../entities/movimiento"
import * as movimientoService from  '../services/movimiento.service';
import { Request,Response} from 'express';
import { BaseResponse } from "../shared/base.response";
import { Message } from "../enums/message";
import { isModuleNamespaceObject } from "util/types";
import { actualizarMovimientoSchema, insertarMovimientoSchema } from "../validators/movimiento.Schema";

export const insertarMovimiento  = async (req: Request, res: Response) => {
    try{
        console.log('insertarMovimiento');
        const {error} = insertarMovimientoSchema.validate(req.body);
        if(error){
            res.status(400).json(BaseResponse.error(error.message,400));
            return;
        }
        const movimiento: Partial<Movimiento> =req.body;
        const newMovimiento: Movimiento = await movimientoService.insertarMovimiento(movimiento);
        res.json(BaseResponse.success(newMovimiento, Message.INSERTADO_OK));
    }catch(error){
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));

    }
}

export const listarMovimiento =async (req: Request, res: Response) => {
    try{
        console.log('listarMovimiento')
        const movimientos: Movimiento[]= await movimientoService.listarMovimiento();
        res.json(BaseResponse.success(movimientos));
    }catch(error){
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const obtenerMovimiento = async (req: Request,  res: Response) => {
    try{
        const { idMovimiento } = req.params;
        const movimiento:Movimiento = await  movimientoService.obtenerMovimiento(Number(idMovimiento));
        if (!movimiento){
            res.status(404).json(BaseResponse.error(Message.NOT_DOUND,404))
            return;
        }
        res.json(BaseResponse.success(movimiento));
    }catch(error){
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const actualizarMovimiento = async (req:Request, res: Response) => {
    try{
        const { idMovimiento } =req.params;
        const {error} = actualizarMovimientoSchema.validate(req.body);
        if(error){
            res.status(400).json(BaseResponse.error(error.message,400));
            return;
        }
        const movimiento: Partial<Movimiento> =req.body;
        if(!(await movimientoService.obtenerMovimiento(Number(idMovimiento)))){
            res.status(404).json(BaseResponse.error(Message.NOT_DOUND,404))
            return;
        }
        const updateMovimiento:Movimiento = await movimientoService.actualizarMovimiento(Number(idMovimiento),movimiento);
        res.json(BaseResponse.success(updateMovimiento,Message.ACTUALIZADO_OK));
    }catch(error){
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const darBajaMovimiento = async (req:  Request, res: Response)=>{
    try{
        const {idMovimiento} = req.params;
        if(!(await movimientoService.obtenerMovimiento(Number(idMovimiento)))){
            res.status(404).json(BaseResponse.error(Message.NOT_DOUND,404))
            return;
        }
        await movimientoService.darBajaMovimiento(Number(idMovimiento));
        res.json(BaseResponse.success(null,Message.ELIMINADO_OK));
    }catch(error){
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}
