import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, ParseIntPipe } from '@nestjs/common';
import { PrestamosService } from './prestamos.service';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';

import { UsuarioAuthGuard } from 'src/guard/usuario.guard';
import { AdminAuthGuard } from 'src/guard/admin.guard';
import { Prestamo } from './entities/prestamo.entity';
import { EntregaDto } from './dto/entrega.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';


@Controller('prestamos')
export class PrestamosController {
  constructor(private readonly prestamosService: PrestamosService) { }

  @UseGuards(UsuarioAuthGuard)
  @Post('/crear')
  async CrearPrestamo(@Body() createPrestamoDto: CreatePrestamoDto) {
    console.log(createPrestamoDto);
    return await this.prestamosService.crearprestamo(createPrestamoDto);

  }

  @UseGuards(AdminAuthGuard)
  @Put('/entregar/:id')
  async entregar(@Param('id') id: number) {
    return await this.prestamosService.entregar(id);
  }

  @UseGuards(AdminAuthGuard)
  @Post('/devolucion')
  async devolucion(@Body() devolucion: EntregaDto) {
    return await this.prestamosService.devolucion(devolucion);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/usuario/:id/:action')
  async getPrestamo(
    @Param('id', ParseIntPipe) id: number,
    @Param('action') action: string,
  ) {
    return await this.prestamosService.obtenerPrestamo(id, action);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/confirmar/:id')
  async updatePrestamo(@Param('id', ParseIntPipe) id: number) {
    return await this.prestamosService.confirmar(id);
  }

  @UseGuards(AdminAuthGuard)
  @Get('/obtener')
  async obtenerPrestamos(): Promise<Prestamo[]> {
    return await this.prestamosService.obtenerPrestamos();
  }

  @Delete('eliminar/:id')
  Eliminar(@Param('id') id: number) {
    return this.prestamosService.Eliminar(id);
  }
}
