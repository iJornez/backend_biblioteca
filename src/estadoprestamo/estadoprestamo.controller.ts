import { Controller, Get, Post, Body, Delete, Param, Put, UseGuards, ParseIntPipe } from '@nestjs/common';
import { EstadoprestamoService } from './estadoprestamo.service';
import { CreateCatDto } from './dto/CreateCat.Dto';
import { UpdateEstadoPrestamoDto } from './dto/update-estadoprestamo.dto';
import { Estadoprestamo } from './entities/estadoprestamo.entity';
import { AdminAuthGuard } from 'src/guard/admin.guard';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';


@Controller('estadoprestamo')
export class EstadoprestamoController {
  constructor(private readonly estadoprestamoService: EstadoprestamoService) { }

  @UseGuards(AdminAuthGuard)
  @Post('/crear')
  async CrearEstado(@Body() tipo: CreateCatDto) {
    return await this.estadoprestamoService.CrearEstado(tipo);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/obtener')
  async obtener(): Promise<Estadoprestamo[]> {
    return await this.estadoprestamoService.ObtenerTodo();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/obtener_estadoprestamo/:id')
  async Obtener_Estado_By_Id(@Param('id', ParseIntPipe) id: number): Promise<Estadoprestamo> {
    return await this.estadoprestamoService.Obtener_id(id);
  }

  @UseGuards(AdminAuthGuard)
  @Put('/actualizar/:id')
  async Actualizar_estado_prestamo(@Param('id', ParseIntPipe) id: number, @Body() UpdateEstadoPrestamoDto: UpdateEstadoPrestamoDto) {
    return await this.estadoprestamoService.Actualizar(id, UpdateEstadoPrestamoDto);
  }

  @UseGuards(AdminAuthGuard)
  @Delete('eliminar/:id')
  async Eliminar(@Param('id') id: number) {
    return await this.estadoprestamoService.EliminarEstado(id);
  }

}
