import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('vehiculos')
export class Vehiculo{
    @PrimaryGeneratedColumn({name:'id_vehiculo'})
    idVehiculo:  number;

    @Column({name:'placa'})
    placa: string;

    @Column({name:'marca'})
    marca: string;

    @Column({name:'modelo'})
    modelo: string;

    @Column({name:'color'})
    color: string;

     @Column({name: 'estado_auditoria'})
        estadoAuditoria: String;
    
    @CreateDateColumn({name: 'fecha_creacion_auditoria'})
        fechaCreacionAuditoria: Date;
    
}