import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { detallePrestamo } from './entities/detalle-prestamo.entity';
import {
  DataSource,
  Equal,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';

@Injectable()
export class DetallePrestamoService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(detallePrestamo)
    private readonly detalleprestamorepository: Repository<detallePrestamo>,
  ) { }
  async crear(detalles) {
  }
  Estado(estadoequipo) {
    return this.detalleprestamorepository.insert(estadoequipo);
  }
  async obtener(codigo_equipo, fechaInicio, fechaDevolucion) {
    fechaInicio = new Date(fechaInicio);
    fechaDevolucion = new Date(fechaDevolucion);
    console.log('ob', codigo_equipo, fechaInicio, fechaDevolucion);

    fechaInicio = new Date(fechaInicio);
    fechaDevolucion = new Date(fechaDevolucion);
    const r = await this.dataSource.getRepository(detallePrestamo).find({
      where: [
        {
          fecha_prestamo: MoreThanOrEqual(fechaInicio),
          fecha_devolucion: LessThanOrEqual(fechaDevolucion),
          equipo: { codigo: Equal(codigo_equipo) },
        },
        {
          fecha_prestamo: LessThanOrEqual(fechaInicio),
          fecha_devolucion: MoreThanOrEqual(fechaInicio),
          equipo: { codigo: Equal(codigo_equipo) },
        },
        {
          fecha_prestamo: LessThanOrEqual(fechaDevolucion),
          fecha_devolucion: MoreThanOrEqual(fechaDevolucion),
          equipo: { codigo: Equal(codigo_equipo) },
        }
      ]


    });
    return r;
  }

  eliminar(id: number) {
    return this.detalleprestamorepository.delete(id);
  }
}
