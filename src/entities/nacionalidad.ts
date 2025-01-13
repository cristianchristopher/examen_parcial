import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "./cliente";


@Entity('nacionalidades')
export class Nacionalidad {
    @PrimaryGeneratedColumn({name:'id_nacionalidad'})
    idNacionalidad:  number;

    @Column({name: 'nombre'})
    nombre:  String;

    @Column({name: 'pais'})
    pais: String;

    @Column({name: 'estado_auditoria'})
    estadoAuditoria: String;

    @CreateDateColumn({name: 'fecha_creacion_auditoria'})
    fechaCreacionAuditoria: Date;

    @OneToMany(()=>Cliente,(nacionalidad)=>nacionalidad.nacionalidad)
    nacionalidades: Nacionalidad[];
}