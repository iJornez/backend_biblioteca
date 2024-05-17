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

  Obtener_id(id: number) {
    return this.estadoequipoRepository.findOne({ where: { id } });
  }

  async Actualizar(id: number, UpdateEstadoEquipoDto: UpdateEstadoEquipoDto) {
    return await this.estadoequipoRepository.update({ id }, UpdateEstadoEquipoDto)
  }

  EliminarEstado(id: number) {
    return this.estadoequipoRepository.delete({ id });
  }


}
