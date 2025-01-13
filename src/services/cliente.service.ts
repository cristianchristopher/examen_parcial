import { AppDataSource } from "../config/db.config";
import { Cliente } from "../entities/cliente";
import { EstadoAuditoria } from "../enums/estado-auditoria";


const repository = AppDataSource.getRepository(Cliente);

export const  insertarCliente =async(data: Partial<Cliente>): Promise<Cliente> => {
    const newCliente: Cliente = await repository.save(data);
    return await repository.findOne({where: {idCliente: newCliente.idCliente}});
}

export const listarClientes = async(): Promise<Cliente[]> => {
    return await repository.find ({
        where: {estadoAuditoria: EstadoAuditoria.ACTIVO,
            nacionalidad: {
                estadoAuditoria: EstadoAuditoria.ACTIVO
            }
         },
         relations: ['nacionalidad']
    });
}

export const obtenerCliente =  async (idCliente: number): Promise<Cliente> =>{
    return await repository.findOne({where: {idCliente, estadoAuditoria: EstadoAuditoria.ACTIVO,
        nacionalidad: {
            estadoAuditoria: EstadoAuditoria.ACTIVO
        }
    },
             relations:['nacionalidad']
    });
}

export const actualizarCliente = async (idCliente: number,data: Partial<Cliente>): Promise<Cliente> => {
    await repository.update(idCliente,data);
    return obtenerCliente(idCliente);
}

export const darBajaCliente = async (idCliente: number): Promise<void> =>{
    await repository.update(idCliente,{estadoAuditoria: EstadoAuditoria.INACTIVO});
}