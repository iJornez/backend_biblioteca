import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';
import { Equipo } from 'src/equipos/entities/equipo.entity';
import { Prestamo } from 'src/prestamos/entities/prestamo.entity';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { } from 'typeorm';

@Entity()
export class CreateDetallePrestamoDto {

  @IsDateString()
  @IsNotEmpty({ message: 'El campo no puede quedar vacio' })
  readonly fecha_prestamo: Date;

  @IsDateString()
  @IsNotEmpty({ message: 'El campo no puede quedar vacio' })
  readonly fecha_devolucion: Date;

  @IsNumber()
  @IsNotEmpty({ message: 'El campo no puede quedar vacio' })
  detalle_prestamo: Prestamo

  @IsNumber()
  @IsNotEmpty({ message: 'El campo no puede quedar vacio' })
  equipo: Equipo;


}
