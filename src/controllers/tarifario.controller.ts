import { Request, Response } from "express";
import { Tarifario } from "../entities/tarifario";
import * as tarifarioService from "../services/tarifario.service";
import { BaseResponse } from "../shared/base.response";
import { Message } from "../enums/message";
import { actualizarTarifarioSchema, insertarTarifarioSchema } from "../validators/tarifario.schema";

export  const insertarTarifario =async (req: Request, res:Response) => {
    try{
        console.log('insertarTarifario');
        const { error } = insertarTarifarioSchema.validate(req.body);
        if(error){
            res.status(400).json(BaseResponse.error(error.message,400));
            return;
        }
        const tarifario: Partial<Tarifario> = req.body;
        const newTarifario: Tarifario =await tarifarioService.insertarTarifario(tarifario);
        res.json(BaseResponse.success(newTarifario,Message.INSERTADO_OK));
    }catch(error){
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const listarTarifarios =async(req: Request,res:Response)  =>{
    try{
        console.log('listarTarifario');
        const tarifario:Tarifario[]=await tarifarioService.listarTarifarios();
        res.json(BaseResponse.success(tarifario));
    }catch(error){
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const obtenerTarifario = async (req: Request, res:Response) =>  {
    try{
        const {idTarifario} =req.params;
        const tarifario:Tarifario = await tarifarioService.obtenerTarifario(Number(idTarifario));
        if(!tarifario){
            res.status(404).json(BaseResponse.error(Message.NOT_DOUND,404))
            return;
        }
        res.json(BaseResponse.success(tarifario));
    }catch(error){
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const actualizarTarifario =  async (req: Request,res: Response) => {
    try{
        const {idTarifario} = req.params;
        const {error} = actualizarTarifarioSchema.validate(req.body);
        if(error){
            res.status(400).json(BaseResponse.error(error.message,400));
            return;
        }
        const tarifario: Partial<Tarifario>=req.body;

        if(!(await tarifarioService.obtenerTarifario(Number(idTarifario)))){
            res.status(404).json(BaseResponse.error(Message.NOT_DOUND,404))
            return;
        }
        const updateTarifario:Tarifario =await tarifarioService.actualizarTarifario(Number(idTarifario),tarifario);
        res.json(BaseResponse.success(updateTarifario, Message.ACTUALIZADO_OK));
    }catch(error){
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const darBajaTarifario = async (req: Request,res: Response) => {
    try{
        const {idTarifario} =req.params;
        if(!(await tarifarioService.obtenerTarifario(Number(idTarifario)))){
            res.status(404).json(BaseResponse.error(Message.NOT_DOUND,404))
            return;
        }
        await tarifarioService.darBajaTarifario(Number(idTarifario));
        res.json(BaseResponse.success(null,Message.ELIMINADO_OK));
    }catch(error){
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}