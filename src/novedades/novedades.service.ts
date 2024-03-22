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

  Novedad(tipo) {
    return this.novedadesRepository.insert(tipo);
  }
  async crearNovedades(novedades: CrearNovedadesDto[]) {
    return await this.dataSource.getRepository(Novedades).createQueryBuilder().insert().values(novedades).execute();
  }
  
  obtener() {
    return this.novedadesRepository.find();
  }
  Obtener_id(id: number) {
    return this.novedadesRepository.findOneBy({ id: id });
  }

  async Actualizar(id: number, UpdateNovedadDto: UpdateNovedadDto): Promise<Novedades> {
    const novedad = await this.novedadesRepository.findOneBy({ id: id });

    if (!novedad) {
      throw new NotFoundException(`La novedad con el ID ${id} no existe`);
    }

    this.novedadesRepository.merge(novedad, UpdateNovedadDto);
    return this.novedadesRepository.save(novedad);
  }

  EliminarNovedad(id: number) {
    return this.novedadesRepository.delete({ id: id });
  }
}
