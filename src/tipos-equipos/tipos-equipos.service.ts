import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TiposEquipos } from "./entities/tipos-equipos.entity";
import { Repository } from "typeorm";
import { TiposEquiposDto } from "./dto/tipos-equipos.Dto";
import { UpdateTipoEquipoDto } from "./dto/update-tipoequipo.dto";


@Injectable()
export class TipoEquipoService {
  constructor(
    @InjectRepository(TiposEquipos)
    private tipoEquipoRepository: Repository<TiposEquipos>,
  ) { }
  async createTipoEquipo(createTipoEquipoDto: TiposEquiposDto) {
    return await this.tipoEquipoRepository.insert(createTipoEquipoDto);
  }

  async getTipoEquipos() {
    return await this.tipoEquipoRepository.find();
  }

  getTipoEquipo(id: number) {
    return this.tipoEquipoRepository.findOne({
      where: {
        id,
      },
    });
  }
  async getPorTipo(tipo: string) {
    return await this.tipoEquipoRepository.find({ where: { tipo: tipo } });
  }
  updateTipoEquipo(id: number, tipoEquipo: UpdateTipoEquipoDto) {
    return this.tipoEquipoRepository.update({ id }, tipoEquipo);
  }

  deleteTipoEquipo(id: number) {
    return this.tipoEquipoRepository.delete({ id });
  }
}
