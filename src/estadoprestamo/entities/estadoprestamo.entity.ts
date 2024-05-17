import { Prestamo } from 'src/prestamos/entities/prestamo.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'estadoprestamo', schema: 'public' })
export class Estadoprestamo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15 })
  estado: string;

  @OneToMany(() => Prestamo, (Prestamo) => Prestamo.estado_prestamo)
  detalle_prestamo: Prestamo[];
}
