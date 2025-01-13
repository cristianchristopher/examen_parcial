import { AppDataSource } from "../config/db.config";
import { Trabajador } from "../entities/trabajador";
import { EstadoAuditoria } from "../enums/estado-auditoria";


const repository = AppDataSource.getRepository(Trabajador);

export const  insertarTrabajador =async(data: Partial<Trabajador>): Promise<Trabajador> => {
    const newTrabajador: Trabajador = await repository.save(data);
    return await repository.findOne({where: {idTrabajador: newTrabajador.idTrabajador}});
}

export const listarTrabajador = async(): Promise<Trabajador[]> => {
    return await repository.find ({
        where: {estadoAuditoria: EstadoAuditoria.ACTIVO,
            nacionalidad: {
                estadoAuditoria: EstadoAuditoria.ACTIVO
            }
         },
         relations: ['nacionalidad']
    });
}

export const obtenerTrabajador =  async (idTrabajador: number): Promise<Trabajador> =>{
    return await repository.findOne({where: {idTrabajador, estadoAuditoria: EstadoAuditoria.ACTIVO,
        nacionalidad: {
            estadoAuditoria: EstadoAuditoria.ACTIVO
        }
    },
             relations:['nacionalidad']
    });
}

export const actualizarTrabajador = async (idTrabajador: number,data: Partial<Trabajador>): Promise<Trabajador> => {
    await repository.update(idTrabajador,data);
    return obtenerTrabajador(idTrabajador);
}

export const darBajaTrabajador = async (idTrabajador: number): Promise<void> =>{
    await repository.update(idTrabajador,{estadoAuditoria: EstadoAuditoria.INACTIVO});
}