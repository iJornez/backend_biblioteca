import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  NotFoundException,
  InternalServerErrorException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EquiposService } from './equipos.service';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { Equipo } from './entities/equipo.entity';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('equipos')
export class EquiposController {
  constructor(private readonly equiposService: EquiposService) { }

  @Post('/crear')
  async Equipo(@Body() createEquipoDto: CreateEquipoDto) {
    try {
      const equipo = await this.equiposService.Equipo(createEquipoDto);
      return equipo;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al crear el equipo');
    }
  }

  @UseInterceptors(
    FileInterceptor('excel', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const unique = Date.now() + Math.random() * 10e9;
          const ext = file.originalname.split('.');
          cb(null, `${unique}.${ext[ext.length - 1]}`);
        }
      })
    })
  )
  @Post('/subirMasivo')
  async subirMasivo(@UploadedFile() excel: Express.Multer.File) {
    return await this.equiposService.subirMasivo(excel);
  }

  @Get('/obtener')
  Obtener() {
    return this.equiposService.ObtenerTodo();
  }

  @Get('/obtener_equipo/:serial')
  Obtener_equipo_By_Id(@Param('serial') serial: string) {
    return this.equiposService.Obtener_id(serial);
  }

  @Put('/actualizar/:serial')
  Actualizar_PorCodigo(@Param('serial') id: string, @Body() updateEquipoDto: UpdateEquipoDto,): Promise<Equipo> {
    return this.equiposService.Actualizar(id, updateEquipoDto);
  }

  @Put('/actualizar')
  Actualizar(@Body() CreateEquipoDto: CreateEquipoDto) {
    return this.equiposService.ActualizarTodo(CreateEquipoDto);
  }

  @Put('/actualizar_estado_equipo/:serial/:idEstado')
  ActualizarEquipo(@Param('codigo') serial: string, @Param('idEstado') idEstado: number) {
    return this.equiposService.ActualizarEstadoEquipo(serial, idEstado);
  }


  @Delete('/eliminar/:serial')
  Eliminar(@Param('serial ') id: number) {
    return this.equiposService.EliminarEquipo(id);
  }

  @Delete('/:serial')
  EliminarEquipo(@Param('serial') serial: string) {
    return this.equiposService.EliminarEquipoPorCodigo(serial);
  }

  @Get('/obtenerBuenos/:tipo/:estado')
  obtener_equipo_buenos(
    @Param('tipo') tipo: number,
    @Param('estado') estado: number,
  ) {
    return this.equiposService.obtenerBuenos(tipo, estado);
  }
}
