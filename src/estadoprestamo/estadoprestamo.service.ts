import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/CreateCat.Dto';
import { Estadoprestamo } from './entities/estadoprestamo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateEstadoPrestamoDto } from './dto/update-estadoprestamo.dto';


@Injectable()
export class EstadoprestamoService {
  constructor(
    @InjectRepository(Estadoprestamo)
    private readonly estadoprestamoRepository: Repository<Estadoprestamo>,
  ) { }

  async CrearEstado(CreateCatDto: CreateCatDto) {
    return await this.estadoprestamoRepository.insert(CreateCatDto).then(estado => {
      return estado != null ? { creado: true, message: 'Estado creado', ex: null } : { creado: false, message: 'No se pudo crear el estado', ex: estado };
    }).catch(error => {
      return {
        creado: false,
        message: 'Sucedió un error creando el estado',
        ex: error
      }
    });
  }

  Obtener_id(id: number) {
    return this.estadoprestamoRepository.findOneBy({ id: id });
  }

  ObtenerTodo() {
    return this.estadoprestamoRepository.find();
  }

  async getEstadoPrestamoByEstado(
    estado = 'Prestado',
  ): Promise<Estadoprestamo> {
    return await this.estadoprestamoRepository.findOne({
      where: { estado: estado },
    });
  }

  Actualizar(id: number, UpdateEstadoPrestamoDto: UpdateEstadoPrestamoDto) {
    return this.estadoprestamoRepository.update({ id }, UpdateEstadoPrestamoDto);
  }

  EliminarEstado(id: number) {
    return this.estadoprestamoRepository.delete({ id: id })
  }
}
