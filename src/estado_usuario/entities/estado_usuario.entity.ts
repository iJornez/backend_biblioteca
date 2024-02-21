import { IsNotEmpty, IsString } from "class-validator";
import { Usuarios } from "src/usuarios/entities/usuarios.entity";
import { Collection, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EstadoUsuario {

    @IsString()
    @IsNotEmpty()
    @PrimaryGeneratedColumn()    
    id: number;

    @Column()
    estado: string;

    @OneToMany(() => Usuarios, (usuarios) => usuarios.estadoDelUsuario)
    usuario: Usuarios[];
    
}
