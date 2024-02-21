import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { EstadoUsuarioService } from './estado_usuario.service';
import { CreateEstadoUsuarioDto } from './dto/create-estado_usuario.dto';
import { UpdateEstadoUsuarioDto } from './dto/update-estado_usuario.dto';
import { EstadoUsuario } from './entities/estado_usuario.entity';

@Controller('estado-usuario')
export class EstadoUsuarioController {
  constructor(private readonly estadoUsuarioService: EstadoUsuarioService) {}

  @Post('/crear')
  Estado(@Body() tipo: CreateEstadoUsuarioDto) {
    return this.estadoUsuarioService.Estado(tipo);
  }

  @Get('/obtener')
  obtener() {
    return this.estadoUsuarioService.ObtenerTodo();
  }

  @Get('/obtener_estadoprestamo/:id')
  Obtener_Estado_By_Id(@Param('id') id: number) {
    return this.estadoUsuarioService.Obtener_id(id);
  }

  @Put('/actualizar')
  Actualizar( @Body() CreateEstadoUsuarioDto: CreateEstadoUsuarioDto) {
    return this.estadoUsuarioService.actualizarTodo(CreateEstadoUsuarioDto);
  }

  @Put('/actualizar/:id')
  Actualizar_estado_prestamo(@Param('id') id: number, @Body() UpdateEstadoPrestamoDto: UpdateEstadoUsuarioDto): Promise<EstadoUsuario> {
    return this.estadoUsuarioService.Actualizar(id, UpdateEstadoPrestamoDto);
  }



}
