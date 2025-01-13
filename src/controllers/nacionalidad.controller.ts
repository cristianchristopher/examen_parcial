import { Request, Response } from "express";
import { Nacionalidad } from "../entities/nacionalidad";
import * as NacionalidadService from "../services/nacionalidad.service"
import { BaseResponse } from "../shared/base.response";
import { Message } from "../enums/message";

export const insertarNacionalidad = async ( req: Request, res: Response) =>{
    try{
        console.log('insertarNacionalidad');
        const nacionalidad: Partial<Nacionalidad> = req.body;
        const newNacionalidad: Nacionalidad =  await NacionalidadService.insertarNacionalidad(nacionalidad);
        res.json(BaseResponse.success(newNacionalidad,Message.INSERTADO_OK));
    }catch(error){
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const listarNacionalidades = async (req: Request, res: Response) => {
    try{
        console.log('listarNacionalidad');
        const nacionalidad:Nacionalidad[]=await NacionalidadService.listarNacionalidades();
        res.json(BaseResponse.success(nacionalidad));
    }catch(error){
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const obtenerNacionalidad =  async (  req:Request, res:Response) =>{
    try{
        const {idNacionalidad}=req.params;
        const nacionalidad:Nacionalidad =  await NacionalidadService.obtenerNacionalidad(Number(idNacionalidad));
        if(!nacionalidad){
            res.status(400).json(BaseResponse.error(Message.NOT_DOUND,404))
            return;
        }
        res.json(BaseResponse.success(nacionalidad));
    }catch(error){
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const actualizarNacionalidad  = async (req: Request, res: Response) => {
    try{
        const {idNacionalidad} = req.params;
        const nacionalidad:  Partial<Nacionalidad>=req.body;
        if(!(await NacionalidadService.obtenerNacionalidad(Number(idNacionalidad)))){
            res.status(404).json(BaseResponse.error(Message.NOT_DOUND,404))
            return;
        }
        const updateNacionalidad:Nacionalidad =  await NacionalidadService.actualizarNacionalidad(Number(idNacionalidad),nacionalidad);
        res.json(BaseResponse.success(updateNacionalidad, Message.ACTUALIZADO_OK));
    }catch(error){
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}


export const darBajaNacionalidad =  async (req:Request,  res:Response) => {
    try{
        const {idNacionalidad} = req.params;
        if(!(await  NacionalidadService.obtenerNacionalidad(Number(idNacionalidad)))){
            res.status(404).json(BaseResponse.error(Message.NOT_DOUND,404))
            return;
        }
        await NacionalidadService.darBajaNacionalidad(Number(idNacionalidad));
        res.json(BaseResponse.success(null,Message.ELIMINADO_OK));
    }catch(error){
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}