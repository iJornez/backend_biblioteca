import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DetallePrestamoService } from './detalle-prestamo.service';
import { CreateDetallePrestamoDto } from './dto/create-detalle-prestamo.dto';

@Controller('detalle-prestamo')
export class DetallePrestamoController {
  constructor(
    private readonly detallePrestamoService: DetallePrestamoService,
  ) {}

  @Post('/crear')
  Estado(@Body() estadoequipo: CreateDetallePrestamoDto) {
    return this.detallePrestamoService.Estado(estadoequipo);
  }

  @Get('/obtener')
  obtener(@Query('codigo_equipo') codigo_equipo, @Query('fechaInicio') fechaInicio, @Query('fechaDevolucion') fechaDevolucion) {
    return this.detallePrestamoService.obtener(codigo_equipo, fechaInicio, fechaDevolucion);
  }

  @Delete('eliminar/:id')
  Eliminar(@Param('id') id: number) {
    return this.detallePrestamoService.eliminar(id);
  }
}
