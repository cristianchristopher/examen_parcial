import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Nacionalidad } from "./nacionalidad";

@Entity('clientes')
export class Cliente {
    @PrimaryGeneratedColumn({name: 'id_cliente'})
    idCliente: number;

    @Column({name: 'nombres'})
    nombres: String;

    @Column({name: 'apellido_paterno'})
    apellidoPaterno: String;

    @Column({name:  'apellido_materno'})
    apellidoMaterno: String;

    @Column({name: 'dni'})
    dni: String;

    @Column({name: 'direccion'})
    direccion: String;

    @Column({name: 'telefono'})
    telefono: String;

    @ManyToOne(()=>Nacionalidad,(nacionalidad)=>nacionalidad.nacionalidades)
    @JoinColumn({name: 'id_nacionalidad'})
    nacionalidad: Nacionalidad;

    @Column({name: 'estado_auditoria'})
    estadoAuditoria: string;
    
    @CreateDateColumn({name: 'fecha_creacion_auditoria'})
    fechaCreacionAuditoria: Date;


}