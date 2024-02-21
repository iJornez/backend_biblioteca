import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TiposEquiposService } from './tipos-equipos.service';
import { TiposEquiposDto } from './dto/tipos.equipos.Dto';
import { UpdateTipoEquipoDto } from './dto/update-tipoequipo.dto';
import { TiposEquipos } from './entities/tipos-equipos.entity';

@Controller('tipos_equipos')
export class TiposEquiposController {
  constructor(private readonly tiposEquiposService: TiposEquiposService) { }

  @Post('/crear')
  Estado(@Body() TiposEquipos: TiposEquiposDto) {
    return this.tiposEquiposService.Estado(TiposEquipos);
  }

  @Get('/obtener')
  obtener() {
    return this.tiposEquiposService.obtener();
  }

  @Get('/obtener_tipoequipo')
  Obtener_tipoequipo_By_Id(@Param('id') id: number) {
    return this.tiposEquiposService.Obtener_id(id);
  }

  @Get('/obtenerTipoPorNombre/:nombre')
  async obtenerTipoPorNombre(@Param('nombre') nombre:string){
    return await this.tiposEquiposService.obtenerTipoPorNombre(nombre);
  }
  @Put('/actualizar/:id')
  Actualizar(@Param('id') id: number, @Body() updateTipoEquipoDto: UpdateTipoEquipoDto): Promise<TiposEquipos> {
    return this.tiposEquiposService.Actualizar(id, updateTipoEquipoDto);

  }

  @Delete('eliminar/:id')
  Eliminar(@Param('id') id: number) {
    return this.tiposEquiposService.Eliminar(id);
  }


}
