import { Request, Response } from "express";
import { Trabajador } from "../entities/trabajador";
import * as trabajadorService from  "../services/trabajador.service";
import { BaseResponse } from "../shared/base.response";
import { Message } from "../enums/message";
import { actualizarTrabajadorSchema, insertarTrabajadorSchema } from "../validators/trabajador.Schema";

export const insertarTrabajador = async (req:  Request, res: Response) =>{
    try{
        console.log('insertarTrabajador');
        const {error} =insertarTrabajadorSchema.validate(req.body);
        if(error){
            res.status(400).json(BaseResponse.error(error.message,100));
            return;
        }
        const trabajador:Partial<Trabajador> = req.body;
        const newTrabajador: Trabajador = await trabajadorService.insertarTrabajador(trabajador);
        res.json(BaseResponse.success(newTrabajador, Message.INSERTADO_OK));
    }catch(error){
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const  listarTrabajador = async (req: Request, res: Response) =>  {
    try{
        console.log('listarTrabajador');
        const trabajador: Trabajador[] = await trabajadorService.listarTrabajador();
        res.json(BaseResponse.success(trabajador));
    }catch(error) {
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const obtenerTrabajador = async(req: Request, res: Response) => {
try{
    const { idTrabajador } = req.params;
    const trabajador:Trabajador = await trabajadorService.obtenerTrabajador(Number(idTrabajador));
    if (!trabajador){
        res.status(404).json(BaseResponse.error(Message.NOT_DOUND,404))
        return;
    }
    res.json(BaseResponse.success(trabajador));
}catch(error){
    console.error(error);
    res.status(500).json(BaseResponse.error(error.message));
}
}

export const actualizarTrabajador = async(req: Request, res: Response) =>{
    try{
        const { idTrabajador } = req.params;
        const {error} =actualizarTrabajadorSchema.validate(req.body);
        if(error){
            res.status(400).json(BaseResponse.error(error.message,400));
            return;
        }
         const trabajador: Partial<Trabajador>=req.body;
        
                if(!(await trabajadorService.obtenerTrabajador(Number(idTrabajador)))){
                    res.status(404).json(BaseResponse.error(Message.NOT_DOUND,404))
                    return;
                }
                const updateTrabajador:Trabajador =await trabajadorService.actualizarTrabajador(Number(idTrabajador),trabajador);
                res.json(BaseResponse.success(updateTrabajador, Message.ACTUALIZADO_OK));
            }catch(error){
                console.error(error);
                res.status(500).json(BaseResponse.error(error.message));
            }
}

export const darBajaTrabajador = async (req: Request,res: Response) => {
    try{
        const {idTrabajador} =req.params;
        if(!(await trabajadorService.obtenerTrabajador(Number(idTrabajador)))){
            res.status(404).json(BaseResponse.error(Message.NOT_DOUND,404))
            return;
        }
        await trabajadorService.darBajaTrabajador(Number(idTrabajador));
        res.json(BaseResponse.success(null,Message.ELIMINADO_OK));
    }catch(error){
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}