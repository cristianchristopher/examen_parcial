import { AppDataSource } from "../config/db.config";
import { Vehiculo } from "../entities/vehiculo";
import { EstadoAuditoria } from "../enums/estado-auditoria";


const repository=AppDataSource.getRepository(Vehiculo);

export const insertarVehiculo=async (data: Partial<Vehiculo>):Promise<Vehiculo> =>{
    const newVehiculo:Vehiculo=await repository.save(data);
    return await repository.findOne({where: {idVehiculo: newVehiculo.idVehiculo}});
}

export const listarVehiculos= async ():Promise<Vehiculo[]> =>{
    return await repository.find({where: {estadoAuditoria: EstadoAuditoria.ACTIVO}});
}

export const obtenerVehiculo = async(idVehiculo: number ): Promise<Vehiculo> => {
    return await repository.findOne({where: {idVehiculo, estadoAuditoria: EstadoAuditoria.ACTIVO}});
}

export const actualizarVehiculo =async (idVehiculo: number,data:  Partial<Vehiculo>): Promise<Vehiculo> => {
    await repository.update(idVehiculo,data);
    return obtenerVehiculo(idVehiculo);
}

export const darBajaVehiculo =  async (idVehiculo: number): Promise<void> => {
    await repository.update(idVehiculo,{estadoAuditoria: EstadoAuditoria.INACTIVO});
}