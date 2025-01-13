import { Request, Response } from "express";
import { Vehiculo } from "../entities/vehiculo";
import * as vehiculoService from "../services/vehiculo.service";
import { BaseResponse } from "../shared/base.response";
import { Message } from "../enums/message";
import { actualizarVehiculoSchema, insertarVehiculoSchema } from "../validators/vehiculo.Schema";


export const insertarVehiculo=async (req: Request,  res: Response) =>{
    try{
        console.log('insertarVehiculo');
        const{error} = insertarVehiculoSchema.validate(req.body);
        if(error){
            res.status(400).json(BaseResponse.error(error.message,400));
            return;
        }
        const vehiculo:Partial<Vehiculo>= req.body;
        const newVehiculo:Vehiculo=await vehiculoService.insertarVehiculo(vehiculo);
        res.json(BaseResponse.success(newVehiculo,Message.INSERTADO_OK));
    }catch(error){
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const  listarVehiculos=async (req:Request,res:Response) =>{
    try{
        console.log('listarVehiculo');
        const vehiculo:Vehiculo[]=await vehiculoService.listarVehiculos();
        res.json(BaseResponse.success(vehiculo));
    }catch(error){
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const obtenerVehiculo=async (req:Request,res:Response)=>{
    try{
        const{idVehiculo}=req.params;
        const vehiculo:Vehiculo=await vehiculoService.obtenerVehiculo(Number(idVehiculo));
        if(!vehiculo){
            res.status(404).json(BaseResponse.error(Message.NOT_DOUND,404))
            return;
        }
        res.json(BaseResponse.success(vehiculo));
    }catch(error){
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const actualizarVehiculo = async (req:Request,res:Response) =>{
    try{
        const {idVehiculo}= req.params;
        const{error}= actualizarVehiculoSchema.validate(req.body);
        if(error){
            res.status(400).json(BaseResponse.error(error.message,400));
            return;
        }
        const vehiculo:Partial<Vehiculo>=req.body;
        if(!(await vehiculoService.obtenerVehiculo(Number(idVehiculo)))){
            res.status(404).json(BaseResponse.error(Message.NOT_DOUND,404))
            return;
        }
        const updateVehiculo:Vehiculo=await vehiculoService.actualizarVehiculo(Number(idVehiculo),vehiculo);
        res.json(BaseResponse.success(updateVehiculo, Message.ACTUALIZADO_OK));
    }catch(error){
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const darBajaVehiculo = async(req: Request,res:Response)=>{
    try{
        const {idVehiculo} =req.params;
        if(!(await vehiculoService.obtenerVehiculo(Number(idVehiculo)))){
            res.status(404).json(BaseResponse.error(Message.NOT_DOUND,404))
            return;
        }
        await vehiculoService.darBajaVehiculo(Number(idVehiculo));
        res.json(BaseResponse.success(null,Message.ELIMINADO_OK));
    }catch(error){
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}