import { DataSource } from "typeorm";
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_TYPE, DB_USERNAME } from "../shared/constants";
import { Movimiento } from "../entities/movimiento";
import { Tarifario } from "../entities/tarifario";
import { Nacionalidad } from "../entities/nacionalidad";
import { Cliente } from "../entities/cliente";
import { Trabajador } from "../entities/trabajador";
import { Vehiculo } from "../entities/vehiculo";
import { Usuario } from "../entities/usuario";

export const AppDataSource =  new DataSource({
    type: DB_TYPE as any,
    host: DB_HOST,
    port: Number (DB_PORT||'0') ,
    username: DB_USERNAME,
    password:  DB_PASSWORD,
    database: DB_DATABASE,
    entities:[Movimiento,
            Tarifario,
            Nacionalidad,
            Cliente,
            Trabajador,
            Vehiculo,
            Usuario,
            Movimiento
            ],
});