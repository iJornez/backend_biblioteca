import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { detallePrestamo } from './entities/detalle-prestamo.entity';
import {
  Between,
  DataSource,
  Equal,
  In,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { UpdateDetallePrestamoDto } from './dto/update-detalle-prestamo.dto';
import { CreateDetallePrestamoDto } from './dto/create-detalle-prestamo.dto';

@Injectable()
export class DetallePrestamoService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(detallePrestamo)
    private readonly detalleprestamorepository: Repository<detallePrestamo>,
  ) { }

  async crearDetallePrestamo(DetallePrestamo: CreateDetallePrestamoDto[] | any[]) {
    return await this.dataSource
      .getRepository(detallePrestamo)
      .createQueryBuilder()
      .insert()
      .into(detallePrestamo)
      .values(DetallePrestamo)
      .execute();
  }

  getDetallePrestamos() {
    return this.detalleprestamorepository.find();
  }

  async getDetallePrestamo(idPrestamo: number) {
    return await this.detalleprestamorepository.find({
      where: {
        detalle_prestamo: { id: idPrestamo }
      }
    })
  }

  async updateDetallePrestamo(id: number, updateDetallePrestamo: UpdateDetallePrestamoDto) {
    return await this.detalleprestamorepository.update({ id }, updateDetallePrestamo);
  }

  async deleteDetallePrestamo(id: number) {
    return await this.detalleprestamorepository.delete({ id });
  }

  async equipoPrestado(
    idEquipo: string,
    fecha_inicio: Date,
    fecha_fin: Date,
  ): Promise<boolean> {
    return await this.dataSource
      .getRepository(detallePrestamo)
      .find({
        where: [
          {
            equipo: { serial: idEquipo },
            fecha_prestamo: MoreThanOrEqual(fecha_inicio),
            fecha_devolucion: LessThanOrEqual(fecha_inicio),
            detalle_prestamo: { estado_prestamo: { id: In([1, 2]) } },
          },
          {
            equipo: { serial: idEquipo },
            fecha_prestamo: Between(fecha_inicio, fecha_fin),
            detalle_prestamo: { estado_prestamo: { id: In([1, 2]) } },
          },
          {
            equipo: { serial: idEquipo },
            fecha_devolucion: Between(fecha_inicio, fecha_fin),
            detalle_prestamo: { estado_prestamo: { id: In([1, 2]) } },
          },
        ],
      })
      .then((detalle) => {
        console.log('Equipos encontrados: idEquipo', idEquipo, detalle);

        return detalle.length > 0;
      })
      .catch((error) => {
        console.log('Error en equipo prestados: ', error);
        return true;
      });
  }

}
