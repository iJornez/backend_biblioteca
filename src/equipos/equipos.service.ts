import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipo } from './entities/equipo.entity';
import { Repository } from 'typeorm';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { Estadoequipo } from 'src/estadoequipo/entities/estadoequipo.entity';
import { EstadoequipoService } from 'src/estadoequipo/estadoequipo.service';
import * as excelToJson from 'convert-excel-to-json'
import * as fs from 'fs';

@Injectable()
export class EquiposService {
  constructor(
    @InjectRepository(Equipo) private readonly equipoRepository: Repository<Equipo>,
    @InjectRepository(Estadoequipo) private readonly estadoEntity: Repository<Estadoequipo>,
    @Inject(EstadoequipoService) private readonly estadoservice: EstadoequipoService
  ) { }

  Equipo(createEquipoDto: CreateEquipoDto) {
    return this.equipoRepository.insert(createEquipoDto);
  }

  Obtener_id(serial: string) {
    return this.equipoRepository.findOneBy({ serial: serial });
  }

  ObtenerTodo() {
    return this.equipoRepository.find({
      relations: {
        tipo: true,
        estado: true,
      },
    });
  }

  async Actualizar(serial: string, updateEquipoDto: UpdateEquipoDto,): Promise<Equipo> {
    const equipo = await this.equipoRepository.findOneBy({ serial: serial });

    if (!equipo) {
      throw new NotFoundException(`El equipo con el ID ${serial} no existe`);
    }

    this.equipoRepository.merge(equipo, updateEquipoDto);
    return this.equipoRepository.save(equipo);
  }

  async ActualizarEstadoEquipo(serial, idEstado) {
    try {
      const equipo = await this.equipoRepository.findOne({ where: { serial } });
      if (!equipo) {
        throw new NotFoundException('Equipo no encontrado');
      }
      const cambioestado = await this.estadoservice.Actualizar(idEstado);
      equipo.estado = cambioestado;
      this.equipoRepository.merge(equipo);
      return this.equipoRepository.save(equipo);
    } catch (error) {
      console.error('Aqui', error)
    }
  }

  ActualizarTodo(CreateEquipoDto: CreateEquipoDto) {
    const equipo = this.equipoRepository.findBy({ serial: CreateEquipoDto.serial });
    if (!equipo) {
      throw new NotFoundException(`El equipo con no existe`);
    }
    return this.equipoRepository.update({ serial: CreateEquipoDto.serial }, CreateEquipoDto);
  }

  EliminarEquipo(serial) {
    return this.equipoRepository.delete(serial);
  }

  async EliminarEquipoPorCodigo(serial: string) {
    return await this.equipoRepository.delete({ serial: serial });
  }

  obtenerBuenos(tipo: number, estado: number) {
    return this.equipoRepository.find({ where: { tipo: { id: tipo }, estado: { id: estado } }, relations: { tipo: true, estado: true } });
  }

  async subirMasivo(excel: Express.Multer.File) {
    const equipos = excelToJson({
      sourceFile: excel.path,
      header: {
        rows: 1,
      }
    });
    const keyhojas = Object.keys(equipos);
    const resp = { creado: [], nocreado: [] };
    console.log(equipos);
    for (let index = 0; index < keyhojas.length; index++) {
      const equiposHoja = equipos[keyhojas[index]];

      for (let j = 0; j < equiposHoja.length; j++) {
        const idCompuesto = `${equiposHoja[j]['B']}-${equiposHoja[j]['C']}`;
        const existEquipo = await this.existEquipo(idCompuesto);
        if (!existEquipo) {
          const equipo = {};
          equipo['serial'] = idCompuesto;
          equipo['telefonica'] = parseInt(equiposHoja[j]['C']) != 1 ? null : equiposHoja[j]['D'];
          equipo['marca'] = equiposHoja[j]['A'];
          equipo['estado'] = parseInt(equiposHoja[j]['E'])
          equipo['tipo'] = parseInt(equiposHoja[j]['C']);

          await this.equipoRepository.insert({ ...equipo, estado: { id: equipo['estado'] } }).then(eq => {
            if (eq != null) {
              resp.creado.push({ serial: equiposHoja[j]['B'] });
            } else {
              resp.nocreado.push({ serial: equiposHoja[j]['B'], ex: eq });
            }
            console.log(eq);

          }).catch(error => {
            resp.nocreado.push({ serial: equiposHoja[j]['B'], ex: error })
          });
        }
      }
    }
    fs.unlinkSync(excel.path);
    return resp;
  }

  async existEquipo(serial: string): Promise<boolean> {
    return await this.equipoRepository.find({ where: { serial: serial } }).then(equipos => {
      return equipos.length > 0;
    }).catch(() => {
      return false;
    });
  }
}
