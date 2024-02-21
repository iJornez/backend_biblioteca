import { Equipo } from "src/equipos/entities/equipo.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Estadoequipo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    estado: string;

    @OneToMany (()=> Equipo, (Equipo) => Equipo.estado)
    equipo : Equipo;
}
