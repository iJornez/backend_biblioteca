import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './Dto/CreateCat.Dto';
import { Estadoprestamo } from './entity/estadoprestamo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateEstadoPrestamoDto } from './Dto/update-estadoprestamo.dto';


@Injectable()
export class EstadoprestamoService {
  constructor(
    @InjectRepository(Estadoprestamo)
    private readonly estadoprestamoRepository: Repository<Estadoprestamo>,
  ) { }

  async Estado(tipo: CreateCatDto): Promise<void> {
    const newtipo = this.estadoprestamoRepository.create();
    await this.estadoprestamoRepository.save(newtipo);
    console.log('hola´');
  }
  Obtener_id(id: number) {
    return this.estadoprestamoRepository.findOneBy({ id: id });
  }
  ObtenerTodo() {
    return this.estadoprestamoRepository.find();
  }
  async Actualizar(id: number){
    const estadoprestamo = await this.estadoprestamoRepository.findOneBy({ id: id });

    if (!estadoprestamo) {
      throw new NotFoundException(`El Estado del prestamo con el ID ${id} no existe`);
    }

    this.estadoprestamoRepository.merge(estadoprestamo);
    return this.estadoprestamoRepository.save(estadoprestamo);
  }

  EliminarEstado(id: number) {
    return this.estadoprestamoRepository.delete({ id: id })
  }
}
