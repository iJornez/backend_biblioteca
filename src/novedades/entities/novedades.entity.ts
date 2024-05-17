import { Equipo } from 'src/equipos/entities/equipo.entity';
import { Prestamo } from 'src/prestamos/entities/prestamo.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, } from 'typeorm';

@Entity({ name: 'novedades', schema: 'public' })
export class Novedades {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'datetime', default: () => 'NOW()' })
  fecha_novedad: Date;

  @ManyToOne(() => Prestamo, (novedades) => novedades.prestamo, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: false
  })
  prestamo: Prestamo;


  @ManyToOne(() => Equipo, equipo => equipo.novedades, {
    nullable: false
  })
  equipo: Equipo;
}
