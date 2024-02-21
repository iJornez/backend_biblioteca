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
} from '@nestjs/common';
import { EquiposService } from './equipos.service';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { Equipo } from './entities/equipo.entity';
import { UpdateEquipoDto } from './dto/update-equipo.dto';

@Controller('equipos')
export class EquiposController {
  constructor(private readonly equiposService: EquiposService) {}

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

  @Get('/obtener')
  Obtener() {
    return this.equiposService.ObtenerTodo();
  }

  @Get('/obtener_equipo/:codigo')
  Obtener_equipo_By_Id(@Param('codigo') codigo: number) {
    return this.equiposService.Obtener_id(codigo);
  }

  @Put('/actualizar/:codigo')
  Actualizar_PorCodigo(@Param('codigo') id: number, @Body() updateEquipoDto: UpdateEquipoDto,): Promise<Equipo> {
    return this.equiposService.Actualizar(id, updateEquipoDto);
  }

  @Put('/actualizar')
  Actualizar(@Body() CreateEquipoDto: CreateEquipoDto) {
    return this.equiposService.ActualizarTodo(CreateEquipoDto);
  }

  @Put('/actualizar_estado_equipo/:codigo/:idEstado')
  ActualizarEquipo(@Param('codigo') codigo:number, @Param('idEstado') idEstado:number)  {
    return this.equiposService.ActualizarEstadoEquipo(codigo, idEstado);
  }


  @Delete('/eliminar/:codigo')
  Eliminar(@Param('codigo') id: number) {
    return this.equiposService.EliminarEquipo(id);
  }

  @Delete('/:codigo')
  EliminarEquipo(@Param('codigo') codigo: number) {
    return this.equiposService.EliminarEquipoPorCodigo(codigo);
  }

  @Get('/obtenerBuenos/:tipo/:estado')
  obtener_equipo_buenos(
    @Param('tipo') tipo: number,
    @Param('estado') estado: number,
  ) {
    return this.equiposService.obtenerBuenos(tipo, estado);
  }
}
