import { AppDataSource } from "../config/db.config";
import { Usuario } from "../entities/usuario";
import { EstadoAuditoria } from "../enums/estado-auditoria";


const repository = AppDataSource.getRepository(Usuario);

export const  insertarUsuario =async(data: Partial<Usuario>): Promise<Usuario> => {
    const newUsuario: Usuario = await repository.save(data);
    return await repository.findOne({where: {idUsuario: newUsuario.idUsuario}});
}

export const listarUsuario = async(): Promise<Usuario[]> => {
    return await repository.find ({
        where: {estadoAuditoria: EstadoAuditoria.ACTIVO,
            trabajador: {
                estadoAuditoria: EstadoAuditoria.ACTIVO
            }
         },
         relations: ['trabajador']
    });
}

export const obtenerUsuario =  async (idUsuario: number): Promise<Usuario> =>{
    return await repository.findOne({where: {idUsuario, estadoAuditoria: EstadoAuditoria.ACTIVO,
        trabajador: {
            estadoAuditoria: EstadoAuditoria.ACTIVO
        }
    },
             relations:['trabajador']
    });
}

export const actualizarUsuario = async (idUsuario: number,data: Partial<Usuario>): Promise<Usuario> => {
    await repository.update(idUsuario,data);
    return obtenerUsuario(idUsuario);
}

export const darBajaUsuario = async (idUsuario: number): Promise<void> =>{
    await repository.update(idUsuario,{estadoAuditoria: EstadoAuditoria.INACTIVO});
}