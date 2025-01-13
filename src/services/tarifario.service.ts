import { AppDataSource } from "../config/db.config";
import { Tarifario } from "../entities/tarifario";
import { EstadoAuditoria } from "../enums/estado-auditoria";


const repository=AppDataSource.getRepository(Tarifario);

export const insertarTarifario=async (data: Partial<Tarifario>): Promise<Tarifario> =>{
    const newTarifario:Tarifario=await repository.save(data);
    return await repository.findOne({where: {idTarifario: newTarifario.idTarifario}});
}

export  const listarTarifarios=  async ():Promise<Tarifario[]> =>  {
    return await repository.find({where: {estadoAuditoria: EstadoAuditoria.ACTIVO}});
}

export const obtenerTarifario = async(idTarifario: number ): Promise<Tarifario> => {
    return await repository.findOne({where: {idTarifario, estadoAuditoria: EstadoAuditoria.ACTIVO}});
}

export const actualizarTarifario =async (idTarifario: number,data:  Partial<Tarifario>): Promise<Tarifario> => {
    await repository.update(idTarifario,data);
    return obtenerTarifario(idTarifario);
}

export const darBajaTarifario =  async (idTarifario: number): Promise<void> => {
    await repository.update(idTarifario,{estadoAuditoria: EstadoAuditoria.INACTIVO});
}