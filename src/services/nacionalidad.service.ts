import { AppDataSource } from "../config/db.config";
import { Nacionalidad } from "../entities/nacionalidad";
import { EstadoAuditoria } from "../enums/estado-auditoria";


const repository=AppDataSource.getRepository(Nacionalidad);

export const insertarNacionalidad= async (data: Partial<Nacionalidad>): Promise<Nacionalidad> => {
    const newNacionalidad:Nacionalidad=await repository.save(data);
    return await repository.findOne({where: {idNacionalidad: newNacionalidad.idNacionalidad}});
}

export  const listarNacionalidades = async ():Promise<Nacionalidad[]> => {
    return await repository.find({where: {estadoAuditoria: EstadoAuditoria.ACTIVO}});
}

export const obtenerNacionalidad = async (idNacionalidad: number): Promise<Nacionalidad> => {
    return await repository.findOne({where: {idNacionalidad, estadoAuditoria: EstadoAuditoria.ACTIVO}});
}

export const actualizarNacionalidad = async (idNacionalidad: number, data: Partial<Nacionalidad>): Promise<Nacionalidad> => {
    await repository.update(idNacionalidad,data);
    return obtenerNacionalidad(idNacionalidad);
}

export const darBajaNacionalidad = async (idNacionalidad:  number): Promise<void> =>{
    await repository.update(idNacionalidad,{estadoAuditoria: EstadoAuditoria.INACTIVO});
}