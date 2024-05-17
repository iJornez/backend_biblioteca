import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { NovedadesService } from './novedades.service';
import { CrearNovedadesDto } from './dto/novedades.dto';
import { UpdateNovedadDto } from './dto/update-equipo.dto';
import { Novedades } from './entities/novedades.entity';
import { AdminAuthGuard } from 'src/guard/admin.guard';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';

@Controller('novedades')
export class NovedadesController {
  constructor(private readonly novedadesService: NovedadesService) { }

  @UseGuards(AdminAuthGuard)
  @Post('/crear')
  async CrearNovedad(@Body() novedadGeneral: CrearNovedadesDto) {
    return this.novedadesService.CrearNovedad(novedadGeneral);
  }

  @Get('/obtener')
  async obtener(): Promise<Novedades[]> {
    return await this.novedadesService.obtener();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/obtener_equipo/:id')
  Obtener_novedad(@Param('id', ParseIntPipe) id: number) {
    return this.novedadesService.Obtener_novedad(id);
  }

  @UseGuards(AdminAuthGuard)
  @Put('/actualizar/:id')
  Actualizar(@Param('id', ParseIntPipe) id: number, @Body() updateEquipoDto: UpdateNovedadDto) {
    return this.novedadesService.Actualizar(id, updateEquipoDto);

  }

  @UseGuards(AdminAuthGuard)
  @Delete('/eliminar/:id')
  Eliminar(@Param('id') id: number) {
    return this.novedadesService.EliminarNovedad(id);
  }

}
