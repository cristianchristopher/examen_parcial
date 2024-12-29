import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tarifarios')
export class Tarifario {
    @PrimaryGeneratedColumn({name:'id_tarifario'})
    idTarifario: number;

    @Column({name:'tipo_vehiculo'})
    tipoVehiculo: string;

    @Column({name: 'tarifa_hora'})
    tarifaHora : number;

    @Column({name: 'estado_auditoria'})
    estadoAuditoria: String;

    @CreateDateColumn({name: 'fecha_creacion_auditoria'})
    fechaCreacionAuditoria: Date;

}