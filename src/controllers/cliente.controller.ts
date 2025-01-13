import { Request, Response } from "express";
import { Cliente } from "../entities/cliente";
import * as clienteService from  "../services/cliente.service"
import { BaseResponse } from "../shared/base.response";
import { Message } from "../enums/message";
import { actualizarClienteSchema, insertarClienteSchema } from "../validators/cliente.Schema";

export const insertarCliente = async (req:  Request, res: Response) =>{
    try{
        console.log('insertarCliente');
        const {error} =insertarClienteSchema.validate(req.body);
        if(error){
            res.status(400).json(BaseResponse.error(error.message,100));
            return;
        }
        const cliente:Partial<Cliente> = req.body;
        const newCliente: Cliente = await clienteService.insertarCliente(cliente);
        res.json(BaseResponse.success(newCliente, Message.INSERTADO_OK));
    }catch(error){
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const  listarClientes = async (req: Request, res: Response) =>  {
    try{
        console.log('listarClientes');
        const clientes: Cliente[] = await clienteService.listarClientes();
        res.json(BaseResponse.success(clientes));
    }catch(error) {
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}

export const obtenerCliente = async(req: Request, res: Response) => {
try{
    const { idCliente } = req.params;
    const cliente:Cliente = await clienteService.obtenerCliente(Number(idCliente));
    if (!cliente){
        res.status(404).json(BaseResponse.error(Message.NOT_DOUND,404))
        return;
    }
    res.json(BaseResponse.success(cliente));
}catch(error){
    console.error(error);
    res.status(500).json(BaseResponse.error(error.message));
}
}

export const actualizarCliente = async(req: Request, res: Response) =>{
    try{
        const { idCliente } = req.params;
        const {error} =actualizarClienteSchema.validate(req.body);
        if(error){
            res.status(400).json(BaseResponse.error(error.message,400));
            return;
        }
         const cliente: Partial<Cliente>=req.body;
        
                if(!(await clienteService.obtenerCliente(Number(idCliente)))){
                    res.status(404).json(BaseResponse.error(Message.NOT_DOUND,404))
                    return;
                }
                const updateCliente:Cliente =await clienteService.actualizarCliente(Number(idCliente),cliente);
                res.json(BaseResponse.success(updateCliente, Message.ACTUALIZADO_OK));
            }catch(error){
                console.error(error);
                res.status(500).json(BaseResponse.error(error.message));
            }
}

export const darBajaCliente = async (req: Request,res: Response) => {
    try{
        const {idCliente} =req.params;
        if(!(await clienteService.obtenerCliente(Number(idCliente)))){
            res.status(404).json(BaseResponse.error(Message.NOT_DOUND,404))
            return;
        }
        await clienteService.darBajaCliente(Number(idCliente));
        res.json(BaseResponse.success(null,Message.ELIMINADO_OK));
    }catch(error){
        console.error(error);
        res.status(500).json(BaseResponse.error(error.message));
    }
}
