import { Controller, Get, Post, Body, Delete, Param, Put } from '@nestjs/common';
import { EstadoprestamoService } from './estadoprestamo.service';
import { CreateCatDto } from './Dto/CreateCat.Dto';
import { UpdateEstadoPrestamoDto } from './Dto/update-estadoprestamo.dto';
import { Estadoprestamo } from './entity/estadoprestamo.entity';


@Controller('estadoprestamo')
export class EstadoprestamoController {
  constructor(private readonly estadoprestamoService: EstadoprestamoService) { }

  @Post('/crear')
  Estado(@Body() tipo: CreateCatDto) {
    return this.estadoprestamoService.Estado(tipo);
  }

  @Get('/obtener')
  obtener() {
    return this.estadoprestamoService.ObtenerTodo();
  }

  @Get('/obtener_estadoprestamo/:id')
  Obtener_Estado_By_Id(@Param('id') id: number) {
    return this.estadoprestamoService.Obtener_id(id);
  }

  @Put('/actualizar/:id')
  Actualizar_estado_prestamo(@Param('id') id: number, @Body() UpdateEstadoPrestamoDto: UpdateEstadoPrestamoDto): Promise<Estadoprestamo> {
    return this.estadoprestamoService.Actualizar(id);
  }

  @Delete('eliminar/:id')
  Eliminar(@Param('id') id: number) {
    return this.estadoprestamoService.EliminarEstado(id);
  }

}
