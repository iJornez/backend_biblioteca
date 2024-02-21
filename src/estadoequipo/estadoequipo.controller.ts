import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { EstadoequipoService } from './estadoequipo.service';
import { CreateEstadoequipoDto } from './dto/create-estadoequipo.dto';
import { UpdateEstadoEquipoDto } from './dto/update-estadoequipo.dto';
import { Estadoequipo } from './entities/estadoequipo.entity';

@Controller('estadoequipo')
export class EstadoequipoController {
  constructor(private readonly estadoequipoService: EstadoequipoService) { }

  @Post('/crear')
  Estado(@Body() estadoequipo: CreateEstadoequipoDto) {
    return this.estadoequipoService.Estado(estadoequipo);
  }

  @Get('/obtener')
  obtener() {
    return this.estadoequipoService.obtener();
  }
  @Get('/obtener_estadoequipo/:id')
  Obtener_Estado_By_Id(@Param('id') id: number) {
    return this.estadoequipoService.Obtener_id(id);
  }

  @Get('/obtenerEstadoPorNombre/:nombre')
  async obtenerTipoPorNombre(@Param('nombre') nombre:string){
    return await this.estadoequipoService.obtenerTipoPorNombre(nombre);
  }
  @Put('/actualizar/:id')
  Actualizar_estado_equipo(@Param('id') id: number, @Body() UpdateEstadoEquipoDto: UpdateEstadoEquipoDto): Promise<Estadoequipo> {
    return this.estadoequipoService.Actualizar(id);
  }

  @Delete('eliminar/:id')
  Eliminar(@Param('id') id: number) {
    return this.estadoequipoService.EliminarEstado(id);
  }
}
