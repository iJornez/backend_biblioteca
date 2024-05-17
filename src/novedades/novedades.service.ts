import { Injectable, NotFoundException } from '@nestjs/common';
import { Novedades } from './entities/novedades.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateNovedadDto } from './dto/update-equipo.dto';
import { CrearNovedadesDto } from './dto/novedades.dto';

@Injectable()
export class NovedadesService {
  constructor(
    @InjectRepository(Novedades)
    private readonly novedadesRepository: Repository<Novedades>,
    private dataSource: DataSource
  ) { }

  CrearNovedad(novedadGeneral: CrearNovedadesDto) {
    return this.novedadesRepository.insert(novedadGeneral);
  }

  async crearNovedades(novedades: CrearNovedadesDto[]) {
    return await this.dataSource
      .getRepository(Novedades)
      .createQueryBuilder()
      .insert()
      .into(Novedades)
      .values(novedades)
      .execute();
  }

  obtener() {
    return this.novedadesRepository.find();
  }
  Obtener_novedad(id: number) {
    return this.novedadesRepository.findOneBy({ id: id });
  }

  async Actualizar(id: number, UpdateNovedadDto: UpdateNovedadDto) {
    return await this.novedadesRepository.update({ id }, UpdateNovedadDto);
  }

  EliminarNovedad(id: number) {
    return this.novedadesRepository.delete({ id});
  }
}
