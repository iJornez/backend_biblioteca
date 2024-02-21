import { Equipo } from 'src/equipos/entities/equipo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TiposEquipos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

  @OneToMany(() => Equipo, equipo => equipo.tipo)
  equipo_tipo: Equipo[];
}
