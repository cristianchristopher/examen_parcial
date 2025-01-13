import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Trabajador } from "./trabajador";

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn({name: 'id_usuario'})
    idUsuario: number;

    @ManyToOne(() => Trabajador, (trabajador) => trabajador.usuarios)
    @JoinColumn({name: 'id_trabajador'})
    trabajador: Trabajador;
    
    @Column({name: 'usuario'})
    usuario: String;

    @Column({name: 'contraseña'})
    contraseña: String;

 

    @Column({name: 'estado_auditoria'})
    estadoAuditoria: string;
    
    @CreateDateColumn({name: 'fecha_creacion_auditoria'})
    fechaCreacionAuditoria: Date;


}