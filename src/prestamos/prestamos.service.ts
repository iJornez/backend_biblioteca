import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Prestamo } from './entities/prestamo.entity';
import { DataSource, Repository } from 'typeorm';
import { EquiposService } from 'src/equipos/equipos.service';
import { DetallePrestamoService } from 'src/detalle-prestamo/detalle-prestamo.service';
import { EntregaDto } from './dto/entrega.dto';
import { NovedadesService } from 'src/novedades/novedades.service';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { EstadoprestamoService } from 'src/estadoprestamo/estadoprestamo.service';

@Injectable()
export class PrestamosService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Prestamo)
    private prestamostabla: Repository<Prestamo>,
    @Inject(EquiposService) private equipoService: EquiposService,
    @Inject(DetallePrestamoService)
    private detalleService: DetallePrestamoService,
    @Inject(EstadoprestamoService)
    private estadoPrestamoService: EstadoprestamoService,
    @Inject(NovedadesService) private novedadesService: NovedadesService,
  ) { }

  async crearprestamo(createPrestamoDto: CreatePrestamoDto) {

    const msgResp = [];
    const queryrunner = this.dataSource.createQueryRunner();
    await queryrunner.connect();
    await queryrunner.manager.find(Prestamo);
    await queryrunner.startTransaction();
    try {
      const prestamo = await this.prestamostabla.insert({
        usuario: createPrestamoDto.usuario,
        estado_prestamo: { id: 1 },
      });
      const detalleEquipoPrestamo = [];
      let index = 0;
      for (const detalle of createPrestamoDto.detalle) {
        const equipos = await this.equipoService.getEquiposByEstadoAndTipo('Bueno', detalle.tipo_equipo);
        if (equipos.length > 0) {
          let equipoPrestado: boolean;
          const detalleEquipo = [];
          for (const equipo of equipos) {
            equipoPrestado = await this.detalleService.equipoPrestado(
              equipo.serial,
              createPrestamoDto.fecha_prestamo,
              createPrestamoDto.fecha_devolucion
            );
            if (detalleEquipo.length != detalle.cantidad) {
              if (!equipoPrestado) {
                detalleEquipoPrestamo.push({
                  fecha_prestamo: createPrestamoDto.fecha_prestamo,
                  fecha_devolucion: createPrestamoDto.fecha_devolucion,
                  prestamo: prestamo.raw.insertId,
                  equipo: equipo.serial
                });
                detalleEquipo.push(equipo);
              }
            } else {
              break;
            }
          }
          if (detalleEquipo.length > 0) {
            msgResp.push({
              indexPrestamo: index,
              prestado: true,
              cantPrestados: detalleEquipo.length,
              equipos: detalleEquipo
            });
          } else {
            msgResp.push({
              indexPrestamo: index,
              message: 'No hay equipos disponibles para prestar, están ocupados',
              prestado: false,
            });
          }
        } else {
          msgResp.push({
            indexPrestamo: index,
            message: 'No hay equipos registrados',
            prestado: false,
          });
        }
        index++;
      }
      if (detalleEquipoPrestamo.length > 0) {
        await this.detalleService.crearDetallePrestamo(
          detalleEquipoPrestamo,
        );
      }
      msgResp.push({ idPrestamo: prestamo.raw.insertId });
      await queryrunner.commitTransaction();
    } catch (error) {
      console.log('error Transaccion', error);
      await queryrunner.rollbackTransaction();
      return error;
    } finally {
      await queryrunner.release()
    }
    return msgResp;
  }


  async obtenerPrestamos() {
    let prestamos = await this.prestamostabla.find({
      order: {
        estado_prestamo: {
          id: 'ASC'
        },
        prestamo_detalle: {
          fecha_prestamo: 'ASC'
        },
      },
    });
    prestamos = prestamos.map((prestamo) => {
      delete prestamo.usuario.password;
      return prestamo;
    });

    return prestamos;
  }

  async obtenerPrestamo(id: number, action = 'all') {
    action = action.toLowerCase();
    let prestamos: Prestamo[];
    if (action == 'entregar') {
      prestamos = await this.prestamostabla.find({
        where: {
          usuario: { cedula: id },
          estado_prestamo: { id: 1 }
        },
        select: ['prestamo_detalle', 'estado_prestamo', 'id', 'prestamo'],
        order: {
          estado_prestamo: {
            id: 'ASC'
          },
          prestamo_detalle: {
            fecha_prestamo: 'ASC'
          },
        },
      });
    } else if (action == 'devolucion') {
      prestamos = await this.prestamostabla.find({
        where: {
          usuario: { cedula: id },
          estado_prestamo: { id: 2 },
        },
        select: ['prestamo_detalle', 'estado_prestamo', 'id', 'prestamo'],
        order: {
          estado_prestamo: {
            id: 'ASC',
          },
          prestamo_detalle: {
            fecha_prestamo: 'ASC'
          },
        },
      });
    } else {
      prestamos = await this.prestamostabla.find({
        where: {
          usuario: { cedula: id }
        },
        order: {
          estado_prestamo: {
            id: 'ASC'
          },
          prestamo_detalle: {
            fecha_prestamo: 'ASC'
          },
        },
      });
    }

    prestamos = prestamos.map((prestamo) => {
      delete prestamo.usuario;
      return prestamo;
    });
    return prestamos;
  }

  async entregar(idPrestamo: number) {
    if (idPrestamo) {
      const estadoP = await this.estadoPrestamoService.getEstadoPrestamoByEstado('Entregado');
      await this.prestamostabla.update(idPrestamo, { estado_prestamo: { id: estadoP.id } });
      return true;
    }
    return false;
  }

  async devolucion(entrega: EntregaDto) {
    const novedades: any = entrega.equipos.map((equipo) => {
      return {
        descripcion: equipo.observacion,
        prestamo: entrega.idPrestamo,
        equipo: equipo.idEquipo
      };
    });
    const novedadCreate = await this.novedadesService.CrearNovedad(novedades);
    if (novedadCreate) {
      const estadoP = await this.estadoPrestamoService.getEstadoPrestamoByEstado('Devuelto');
      for (const equipo of entrega.equipos) {
        await this.equipoService.ActualizarEstadoEquipo(
          equipo.idEquipo,
          equipo.estado_equipo
        );
      }
      await this.prestamostabla.update(entrega.idPrestamo, { estado_prestamo: { id: estadoP.id } });
      return true;
    }
    return false;
  }

  async confirmar(id: number) {
    const exist = await this.existPrestamo(id);
    if (exist) {
      const estadoPrestamo = await this.estadoPrestamoService.getEstadoPrestamoByEstado('Entregado');
      if (estadoPrestamo) {
        await this.prestamostabla.update({ id: id }, { estado_prestamo: { id: estadoPrestamo.id } });
        return { confirm: true, message: 'Préstamo confirmado' };
      }
    }
    return { confirm: false, message: 'No existe el prestamo' };
  }

  Eliminar(id: number) {
    return this.prestamostabla.delete({ id: id });
  }

  async eliminarPrestamo(id: number) {
    const prestamoAEliminar = await this.prestamostabla.delete(id);
    if (!prestamoAEliminar) {
      throw new Error('El préstamo no existe.');
    }
    return this.prestamostabla.delete(id);
  }

  private async existPrestamo(id: number): Promise<boolean> {
    return await this.prestamostabla
      .findBy({ id: id })
      .then((prestamo) => {
        return prestamo.length > 0;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }
}
