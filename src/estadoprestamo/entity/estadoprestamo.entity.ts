import { Prestamo } from 'src/prestamos/entities/prestamo.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'estadoprestamo', schema: 'public' })
export class Estadoprestamo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Estado: string;

  @OneToMany(() => Prestamo, (Prestamo) => Prestamo.estado_prestamo)
  detalle_prestamo: Prestamo[];
}
