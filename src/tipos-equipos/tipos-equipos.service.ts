import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TiposEquipos } from './entities/tipos-equipos.entity';
import { Repository } from 'typeorm';
import { TiposEquiposDto } from './dto/tipos.equipos.Dto';
import { UpdateTipoEquipoDto } from './dto/update-tipoequipo.dto';

@Injectable()
export class TiposEquiposService {
  constructor(
    @InjectRepository(TiposEquipos)
    private readonly TiposEquiposTablas: Repository<TiposEquipos>,
  ) {}

  Estado(TiposEquipos: TiposEquiposDto) {
    return this.TiposEquiposTablas.insert(TiposEquipos);
  }

  obtener() {
    return this.TiposEquiposTablas.find();
  }

  Obtener_id(id) {
    return this.TiposEquiposTablas.find(id );
  }
  async obtenerTipoPorNombre(nombre: string): Promise<TiposEquipos[] | []> {
    return await this.TiposEquiposTablas.findBy({ tipo: nombre });
  }
  
  async Actualizar(
    id: number,
    updateTipoEquipoDto: UpdateTipoEquipoDto,
  ): Promise<TiposEquipos> {
    const tipo_equipo = await this.TiposEquiposTablas.findOneBy({ id: id });

    if (!tipo_equipo) {
      throw new NotFoundException(
        `El tipo de equipo con el ID ${id} no existe`,
      );
    }

    this.TiposEquiposTablas.merge(tipo_equipo, updateTipoEquipoDto);
    return this.TiposEquiposTablas.save(tipo_equipo);
  }

  Eliminar(id: number) {
    return this.TiposEquiposTablas.delete({ id: id });
  }
}
