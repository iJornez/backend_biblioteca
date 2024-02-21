import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UpdateUsuariosDto } from './dto/update-usuarios.dto';
import { Usuarios } from './entities/usuarios.entity';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

 

  @Get('/obtener')
  Obtener() {
    return this.usuariosService.ObtenerTodo();
  }

  @Get('/obtener_usuario/:cedula')
  Obtener_usuario_By_Cedula(@Param('cedula') cedula: string) {
    return this.usuariosService.Obtener_cedula(cedula);
  }

  @Put('/actualizar')
  Actualizar( @Body() CreateEquipoDto: UpdateUsuariosDto) {
    return this.usuariosService.ActualizarTodo(CreateEquipoDto);
  }

  

  @Put('/actualizar/:cedula')
  ActualizarUsuario(@Param('cedula') cedula: string, @Body() UpdateUsuariosDto: UpdateUsuariosDto): Promise<Usuarios> {
    return this.usuariosService.Actualizar(cedula, UpdateUsuariosDto);
  }

  @Delete('/eliminar/:cedula')
  Eliminar(@Param('id') cedula: string) {
    return this.usuariosService.EliminarUsuario(cedula);
  }
}
