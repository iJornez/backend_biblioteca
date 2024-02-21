import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { NovedadesService } from './novedades.service';
import { NovedadesDto } from './dto/novedades.dto';
import { UpdateNovedadDto } from './dto/update-equipo.dto';
import { Novedades } from './entities/novedades.entity';

@Controller('novedades')
export class NovedadesController {
  constructor(private readonly novedadesService: NovedadesService) { }

  @Post('/crear')
  Novedad(@Body() tipo: NovedadesDto) {
    return this.novedadesService.Novedad(tipo);
  }

  @Get('/obtener')
  obtener() {
    return this.novedadesService.obtener();
  }

  @Get('/obtener_equipo/:id')
  Obtener_equipo_By_Id(@Param('id') id: number) {
    return this.novedadesService.Obtener_id(id);
  }

  @Put('/actualizar/:id')
  Actualizar(@Param('id') id: number, @Body() updateEquipoDto: UpdateNovedadDto): Promise<Novedades> {
    return this.novedadesService.Actualizar(id, updateEquipoDto);

  }
  @Delete('/eliminar/:id')
  Eliminar(@Param('id') id: number) {
    return this.novedadesService.EliminarNovedad(id);
  }

}
