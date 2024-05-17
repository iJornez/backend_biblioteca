import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  InternalServerErrorException,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { EquiposService } from './equipos.service';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { Equipo } from './entities/equipo.entity';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AdminAuthGuard } from 'src/guard/admin.guard';

@UseGuards(AdminAuthGuard)
@Controller('equipos')
export class EquiposController {
  constructor(private readonly equiposService: EquiposService) { }

  @Post('/crear')
  async crearEquipo(@Body() createEquipoDto: CreateEquipoDto) {
    try {
      const equipo = await this.equiposService.crearEquipo(createEquipoDto);
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

  @Put('/actualizar')
  Actualizar(@Body() CreateEquipoDto: CreateEquipoDto) {
    return this.equiposService.ActualizarTodo(CreateEquipoDto);
  }

  @Delete('/:serial')
  EliminarEquipo(@Param('serial') serial: string) {
    return this.equiposService.EliminarEquipoPorSerial(serial);
  }
}
