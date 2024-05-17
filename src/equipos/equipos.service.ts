import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipo } from './entities/equipo.entity';
import { Repository } from 'typeorm';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { Estadoequipo } from 'src/estadoequipo/entities/estadoequipo.entity';
import { EstadoequipoService } from 'src/estadoequipo/estadoequipo.service';
import * as excelToJson from 'convert-excel-to-json';
import * as fs from 'fs';

@Injectable()
export class EquiposService {
  constructor(
    @InjectRepository(Equipo) private readonly equipoRepository: Repository<Equipo>,
    @InjectRepository(Estadoequipo) private readonly estadoEntity: Repository<Estadoequipo>,
    @Inject(EstadoequipoService) private readonly estadoservice: EstadoequipoService
  ) { }

  async crearEquipo(createEquipoDto: CreateEquipoDto) {
    const exist = await this.existEquipo(`${createEquipoDto.serial}-${createEquipoDto.tipo}`);
    if (!exist) {
      return await this.equipoRepository.insert({
        ...createEquipoDto,
        serial: `${createEquipoDto.serial}-${createEquipoDto.tipo}`,
        estado: { id: 1 },
      }).then(equipo => {
        return equipo != null ? { creado: true, message: 'Equipoc creado', ex: null } : { creado: false, message: 'No se pudo crear el equipo', ex: equipo };
      }).catch(error => {
        return { creado: false, message: 'sucedió un error creando el equipo', ex: error };
      });
    }
    return { creado: false, message: 'El serial ya existe, no se puede crear el equipo', ex: null };
  }

  async subirMasivo(excel: Express.Multer.File) {
    const equipos = excelToJson({
      sourceFile: excel.path,
      header: {
        rows: 1,
      }
    });
    const keyHojas = Object.keys(equipos);
    const creados = [],
      nocreados = [];
    await Promise.all(
      keyHojas.map(async (hoja) => {
        const equiposHoja = equipos[hoja];
        await Promise.all(
          equiposHoja.map(async (fila: any) => {
            const idCompuesto = `${fila['B']} - ${fila['C']}`;
            const existEquipo = await this.existEquipo(idCompuesto);
            if (!existEquipo) {
              const equipo = {};
              equipo['marca'] = fila['A'];
              equipo['serial'] = idCompuesto;
              equipo['tipo'] = parseInt(fila['C']);
              equipo['codigo_telefonica'] = parseInt(fila['C']) != 1 ? null : fila['D'];
              equipo['estado'] = parseInt(fila['E']);
              await this.equipoRepository.insert({ ...equipo })
                .then((equipoBd) => {
                  if (equipoBd != null) {
                    creados.push({
                      creado: true,
                      message: 'Equipo creado',
                      serial: fila['B'],
                      ex: null
                    });
                  } else {
                    nocreados.push({
                      creados: false,
                      message: 'No se pudo crear el equipo',
                      seria: fila['B'],
                      ex: equipoBd
                    });
                  }
                }).catch((error) => {
                  nocreados.push({
                    creados: false,
                    message: 'Ocurrio un error al crear equipo',
                    seria: fila['B'],
                    ex: error
                  })
                });
            } else {
              nocreados.push({
                creados: false,
                message: 'El equipo ya esta creado',
                seria: fila['B'],
                ex: null
              })
            }
          }));
      })
    );
    fs.unlinkSync(excel.path);
    return { creados: [...creados], nocreados: [...nocreados] };
  }

  ObtenerTodo() {
    return this.equipoRepository.find();
  }

  async Actualizar(equipo: UpdateEquipoDto) {
    return await this.equipoRepository.update({ serial: equipo.serial }, { marca: equipo.marca, estado: { id: equipo.estado } }).then(equipo => {
      return equipo.affected == 1 ? { actualizado: true, message: "Datos actualizados", ex: null } : { actualizado: false, message: "No se pudo actualizar los datos", ex: equipo };
    }).catch(error => {
      return { actualizado: false, message: "Sucedió un problema actualizando los datos", ex: error };
    });
  }

  async ActualizarEstadoEquipo(id_equipo, id_estado) {
    return await this.equipoRepository.update(id_equipo, {
      estado: { id: id_estado }
    });
  }

  ActualizarTodo(CreateEquipoDto: CreateEquipoDto) {
    const equipo = this.equipoRepository.findBy({ serial: CreateEquipoDto.serial });
    if (!equipo) {
      throw new NotFoundException(`El equipo con no existe`);
    }
    return this.equipoRepository.update({ serial: CreateEquipoDto.serial }, CreateEquipoDto);
  }

  async EliminarEquipoPorSerial(serial: string) {

    return await this.equipoRepository.delete({ serial: serial }).then(equipo => {
      return equipo.affected == 1 ? { eliminado: true, message: "Equipo eliminado", ex: null } : { eliminado: false, message: "No se pudo eliminar el equipo", ex: equipo };
    }).catch(error => {
      return { eliminado: false, message: 'Sucedió un error eliminando el equipo', ex: error };
    });
  }

  /**
 @param estado Estado del equipo, Ej: Bueno, En reparación, etc.
 @param tipo Id del tipo de equipo, Ej: 1 - Portátil, 2 - VideoBeam, etc.
  */
  async getEquiposByEstadoAndTipo(estado: string, tipo: number) {
    return await this.equipoRepository.findBy({
      estado: { estado: estado },
      tipo: { id: tipo },
    });
  }



  async existEquipo(serial: string): Promise<boolean> {
    return await this.equipoRepository.find({ where: { serial: serial } }).then(equipos => {
      return equipos.length > 0;
    }).catch(() => {
      return false;
    });
  }
}
