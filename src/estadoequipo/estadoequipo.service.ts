import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstadoequipoDto } from './dto/create-estadoequipo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estadoequipo } from './entities/estadoequipo.entity';
import { Repository } from 'typeorm';
import { UpdateEstadoEquipoDto } from './dto/update-estadoequipo.dto';

@Injectable()
export class EstadoequipoService {
  constructor(
    @InjectRepository(Estadoequipo)
    private readonly estadoequipoRepository: Repository<Estadoequipo>,
  ) { }

  Estado(estadoequipo: CreateEstadoequipoDto) {
    return this.estadoequipoRepository.insert(estadoequipo);
  }
  obtener() {
    return this.estadoequipoRepository.find();
  }

  async obtenerTipoPorNombre(nombre: string): Promise<Estadoequipo[] | []> {
    return await this.estadoequipoRepository.findBy({ estado: nombre });
  }
  Obtener_id(id: number) {
    return this.estadoequipoRepository.findOneBy({ id: id });
  }

  async Actualizar(id: number ): Promise<Estadoequipo> {
    const estadoequipo = await this.estadoequipoRepository.findOneBy({ id: id });

    if (!estadoequipo) {
      throw new NotFoundException(`El Estado del Equipo con el ID ${id} no existe`);
    }

    this.estadoequipoRepository.merge(estadoequipo);
    return this.estadoequipoRepository.save(estadoequipo);
  }

  EliminarEstado(id: number) {
    return this.estadoequipoRepository.delete({ id: id });
  }


}
