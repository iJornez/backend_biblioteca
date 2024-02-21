import { IsNotEmpty } from 'class-validator';
import { Equipo } from 'src/equipos/entities/equipo.entity';
import { Prestamo } from 'src/prestamos/entities/prestamo.entity';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { } from 'typeorm';

@Entity()
export class CreateDetallePrestamoDto {
  constructor(detalle_prestamo, equipo, fecha_prestamo, fecha_devolucion) {
    this.detalle_prestamo = detalle_prestamo;
    this.equipo = equipo;
    this.fecha_prestamo = fecha_prestamo;
    this.fecha_devolucion = fecha_devolucion;
  }

  @IsNotEmpty()
  detalle_prestamo: Prestamo

  @IsNotEmpty({ message: 'El campo no puede quedar vacio' })
  equipo: Equipo;

  @IsNotEmpty({ message: 'El campo no puede quedar vacio' })
  fecha_prestamo: Date;

  @IsNotEmpty({ message: 'El campo no puede quedar vacio' })
  fecha_devolucion: Date;
}
