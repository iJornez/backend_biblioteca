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
    @Inject(EstadoequipoService) private readonly estadoservice : EstadoequipoService
  ) { }

  Equipo(createEquipoDto: CreateEquipoDto) {
    return this.equipoRepository.insert(createEquipoDto);
  }

  Obtener_id(codigo: number) {
    return this.equipoRepository.findOneBy({ codigo: codigo });
  }

  ObtenerTodo() {
    return this.equipoRepository.find({
      relations: {
        tipo: true,
        estado: true,
      },
    });
  }

  async Actualizar(codigo: number, updateEquipoDto: UpdateEquipoDto,): Promise<Equipo> {
    const equipo = await this.equipoRepository.findOneBy({ codigo: codigo });

    if (!equipo) {
      throw new NotFoundException(`El equipo con el ID ${codigo} no existe`);
    }

    this.equipoRepository.merge(equipo, updateEquipoDto);
    return this.equipoRepository.save(equipo);
  }

  async ActualizarEstadoEquipo(codigo, idEstado) {
    try {
      const equipo = await this.equipoRepository.findOne({ where: { codigo } });
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

  ActualizarTodo(CreateEquipoDto : CreateEquipoDto) {
    const equipo = this.equipoRepository.findBy({ codigo: CreateEquipoDto.codigo });
    if (!equipo) {
      throw new NotFoundException(`El equipo con no existe`);
    }
    return this.equipoRepository.update({codigo: CreateEquipoDto.codigo}, CreateEquipoDto);
  }

  EliminarEquipo(codigo) {
    return this.equipoRepository.delete(codigo);
  }

  async EliminarEquipoPorCodigo(codigo : number) {
    return await this.equipoRepository.delete({codigo : codigo});
  }

  obtenerBuenos(tipo:number, estado:number){
    return this.equipoRepository.find({where:{tipo:{id:tipo}, estado:{id:estado}},relations:{tipo:true, estado:true}});
  }

 async subirMasivo(excel:Express.Multer.File){
    const equipos = excelToJson({
      sourceFile: excel.path,
      header:{
        rows: 1,
      }
    });
    const keyhojas = Object.keys(equipos);
    const resp ={ creado: [], nocreado:[]};
    console.log(equipos);
    for (let index = 0; index < keyhojas.length; index++) {
      const equiposHoja= equipos[keyhojas[index]];

      for (let j = 0; index < equiposHoja.length; index++) {
        const idCompuesto = `${equiposHoja[j]['B']}-${equiposHoja[j]['C']}`;
        const existEquipo= await this.existEquipo(idCompuesto);
        if (!existEquipo) {
          const equipo= {};
          equipo['marca']= equiposHoja[j]['A'];
          equipo['serial']= idCompuesto;  
          equipo['tipo_equipo']= parseInt(equiposHoja[j]['C']);
          equipo['estado_equipo'] = parseInt(equiposHoja[j]['E'])
          equipo['telefonica']= parseInt(equiposHoja[j]['C']) != 4 ? null: equiposHoja[j]['D'] ;
          await this.equipoRepository.insert({...equipo, estado: {id: equipo['estado_equipo']}}).then(eq=>{
            if (eq != null) {
              resp.creado.push({serial:equiposHoja[j]['B']});
            } else{
              resp.nocreado.push({serial:equiposHoja[j]['B'], ex:eq});
            }
            console.log(eq);
            
          }).catch(error => {
            resp.nocreado.push({serial:equiposHoja[j]['B'], ex:error})
          });
        }
      }
    }
    fs.unlinkSync(excel.path);
    return resp;
  }

  async existEquipo(serial: string):Promise<boolean>{
    return await this.equipoRepository.find({where: {serial: serial}}).then(equipos=>{
      return equipos.length>0;
    }).catch(()=>{
      return false;
    });
  }
}
