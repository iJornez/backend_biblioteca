import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuarios } from './entities/usuarios.entity';
import { registerDto } from './dto/register.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  @HttpCode(HttpStatus.OK)
  @Post('/register')
  async registerIn(@Body() registerDto: registerDto) {
    return await this.usuariosService.registerIn(registerDto);
  }

  @Get('/obtener')
  Obtener() {
    return this.usuariosService.ObtenerTodo();
  }

  @Get('/obtener_usuario/:cedula')
  Obtener_usuario_By_Cedula(@Param('cedula') cedula: string) {
    return this.usuariosService.Obtener_cedula(cedula);
  }


  @Put('/actualizar/:cedula')
  ActualizarUsuario(@Param('cedula') cedula: string, @Body() usuarioDto: registerDto): Promise<Usuarios> {
    return this.usuariosService.Actualizar(cedula, usuarioDto);
  }

  @Delete('/eliminar/:cedula')
  Eliminar(@Param('id') cedula: string) {
    return this.usuariosService.EliminarUsuario(cedula);
  }
}
