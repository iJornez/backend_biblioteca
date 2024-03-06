import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Prestamo } from './entities/prestamo.entity';
import { Repository } from 'typeorm';
import { EquiposService } from 'src/equipos/equipos.service';
import { DetallePrestamoService } from 'src/detalle-prestamo/detalle-prestamo.service';
import { CreateDetallePrestamoDto } from 'src/detalle-prestamo/dto/create-detalle-prestamo.dto';
import { detallePrestamo } from 'src/detalle-prestamo/entities/detalle-prestamo.entity';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { EstadoprestamoService } from 'src/estadoprestamo/estadoprestamo.service';
import { Estadoprestamo } from 'src/estadoprestamo/entity/estadoprestamo.entity';
import { UpdateEstadoPrestamoDto } from 'src/estadoprestamo/Dto/update-estadoprestamo.dto';
import { DevolverDto } from './dto/devolver.dto';
import { NovedadesService } from 'src/novedades/novedades.service';

@Injectable()
export class PrestamosService {
  constructor(
    @Inject(EquiposService) private equipoService: EquiposService,
    @Inject(DetallePrestamoService) private detalleService: DetallePrestamoService,
    @Inject(EstadoprestamoService) private estadoservice: EstadoprestamoService,
    @Inject(NovedadesService) private novedadesService: NovedadesService,
    @InjectRepository(Prestamo) private prestamostabla: Repository<Prestamo>,
    @InjectRepository(detallePrestamo) private detalle: Repository<detallePrestamo>,
    @InjectRepository(Estadoprestamo) private estado: Repository<Estadoprestamo>,
  ) { }

  async Crearprestamo(prestamos) {
    var r = await this.prestamostabla.insert(prestamos);
    console.log(r);
    var prestar = [];

    for (var data of prestamos.detalle) {
      let equipos = await this.equipoService.obtenerBuenos(data.tipo, 1);
      let r2;
      let contador = 1;
      for (let d of equipos) {
        if (contador <= data.cantidad) {
          r2 = await this.detalleService.obtener(d.codigo, prestamos.fecha_prestamo, prestamos.fecha_devolucion);
          console.log('r2: ', r2);

          if (r2.length == 0) {
            prestar.push(d);
            contador++;
          }
        } else {
          break;
        }
      }
      console.log('prestamo', prestar);
    }
    var id = r.identifiers[0].id;
    if (prestar.length === 0) {
      this.eliminarPrestamo(id);
      throw new Error('No se pueden prestar equipos debido a conflictos de fechas');
    }

    for (let data of prestar) {

      let detalle = new CreateDetallePrestamoDto(id, data.codigo, prestamos.fecha_prestamo, prestamos.fecha_devolucion);
      console.log(detalle);
      var r = await this.detalle.insert(detalle);
    }
    return r;
  }


  obtener() {
    return this.prestamostabla.find({ relations: { estado_prestamo: true } });
  }

  Obtener_id(id: number) {
    return this.prestamostabla.findOneBy({ id: id });
  }

  Obtener_prestamousuario(id: string) {
    return this.prestamostabla.find({ where: { usuario: { cedula: id } }, relations: { prestamo_detalle: true, estado_prestamo: true, usuario: true } });
  }

  Eliminar(id: number) {
    return this.prestamostabla.delete({ id: id });
  }


  async ActualizarEstadoPrestamo(id, EstadoPrestamoId) {
    try {
      const prestamo = await this.prestamostabla.findOne({ where: { id }, relations: { estado_prestamo: true } });
      if (!prestamo) {
        throw new NotFoundException('Prestamo no encontrado');
      }
      const cambioestado = await this.estadoservice.Actualizar(EstadoPrestamoId);
      prestamo.estado_prestamo = cambioestado;
      return this.prestamostabla.save(prestamo);
    } catch (error) {
      console.error('Aqui', error)
    }
  }


  async eliminarPrestamo(id: number) {
    const prestamoAEliminar = await this.prestamostabla.delete(id);
    if (!prestamoAEliminar) {
      throw new Error('El préstamo no existe.');
    }
    return this.prestamostabla.delete(id);
  }

  async devolucion(devolver: DevolverDto) {
    const novedades: any = devolver.equipos.map(equipo => {
      return {
        prestamo: devolver.idPrestamo,
        equipo: equipo.idEquipo,
        descripcion: equipo.descripcion
      }
    });
    const novedadesCreate = await this.novedadesService.crearNovedades(novedades);
    if (novedadesCreate) {
      for (const equipo of devolver.equipos) {
        await this.equipoService.ActualizarEstadoEquipo(equipo.idEquipo, equipo.idEstado);

      }
      return { message: 'Estado del equipo actualizado con exito!' };
    }
  }

}
