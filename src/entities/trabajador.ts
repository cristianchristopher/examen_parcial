import { Column, CreateDateColumn, Entity,OneToMany, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Nacionalidad } from "./nacionalidad";
import { Usuario } from "./usuario";

@Entity('trabajadores')
export class Trabajador {
    @PrimaryGeneratedColumn({name: 'id_trabajador'})
    idTrabajador: number;

    

    @Column({name: 'nombres'})
    nombres: String;

    @Column({name: 'apellido_paterno'})
    apellidoPaterno: String;
 
    @Column({name:  'apellido_materno'})
    apellidoMaterno: String;

    @Column({name: 'tipo_documento'})
    tipo_documento: String;

    @Column({name: 'numero_documento'})
    numero_documento: String;

    @Column({name: 'direccion'})
    direccion: String;

    @Column({name: 'telefono'})
    telefono: String;

    @ManyToOne(() => Nacionalidad, (nacionalidad) => nacionalidad.trabajadores)
    @JoinColumn({name: 'id_nacionalidad'})
    nacionalidad: Nacionalidad;

    @Column({name: 'estado_auditoria'})
    estadoAuditoria: string;
    
    @CreateDateColumn({name: 'fecha_creacion_auditoria'})
    fechaCreacionAuditoria: Date;

    @OneToMany(()=>Usuario,(usuario)=>usuario.trabajador)
    usuarios: Usuario[];


}