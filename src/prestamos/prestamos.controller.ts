import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PrestamosService } from './prestamos.service';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { DevolverDto } from './dto/devolver.dto';

@Controller('prestamos')
export class PrestamosController {
  constructor(private readonly prestamosService: PrestamosService) { }

  @Post('/crear')
  Estado(@Body() Prestamo: CreatePrestamoDto) {
    console.log(Prestamo);
    return this.prestamosService.Crearprestamo(Prestamo);
    
  }

  @Get('/obtener_prestamo/:cedula')
  Obtener_prestamoporCedula(@Param('cedula') id: string) {
    return this.prestamosService.Obtener_prestamousuario(id);
  }

  @Get('/obtener')
  obtener() {
    return this.prestamosService.obtener();
  }

  @Get('/obtener_tipoequipo/:id')
  Obtener_tipoequipo_By_Id(@Param('id') id: number) {
    return this.prestamosService.Obtener_id(id);
  }

  @Put('/actualizar_estado/:id/:EstadoPrestamoId')
  ActualizarEstadoPrestamo(@Param('id') id, @Param('EstadoPrestamoId') EstadoPrestamoId) {
    return this.prestamosService.ActualizarEstadoPrestamo(id, EstadoPrestamoId);
  }

  @Put('/devolucion')
  async devolucion(@Body() devolver: DevolverDto) {
    return await this.prestamosService.devolucion(devolver);
  }

  @Delete('eliminar/:id')
  Eliminar(@Param('id') id: number) {
    return this.prestamosService.Eliminar(id);
  }
}
