import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsuarioService } from './usuarios.service';
import { AdminAuthGuard } from 'src/guard/admin.guard';
import { registerDto } from './dto/register.dto';
import { Usuarios } from './entities/usuarios.entity';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { UsuariosDto } from './dto/update-usuario.dto';


@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @UseGuards(AdminAuthGuard)
  @Post('/crear')
  async createUsuario(@Body() newUsuario: registerDto) {
    return await this.usuarioService.createUsuario(newUsuario);
  }

  @UseGuards(AdminAuthGuard)
  @Get()
  async getUsuarios(): Promise<Usuarios[]> {
    return await this.usuarioService.getUsuarios();
  }

  @Get('/puede-recuperar/:cedula/:token')
  async puedeRecuperar(@Param('cedula', ParseIntPipe) cedula: number, @Param('token') token: string) {
    return await this.usuarioService.puedeRecuperar(cedula, token);
  }

  @Post('/recuperar-contrasena')
  async recuperarContrasena(@Body('email') email: string) {
    return await this.usuarioService.recuperarContrasena(email);
  }

  @UseGuards(AdminAuthGuard)
  @Get('/instructor')
  async getInstructores(): Promise<Usuarios[]> {
    return await this.usuarioService.getInstructores();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/usuario/:id')
  getUsuario(@Param('id', ParseIntPipe) id: number): Promise<Usuarios> {
    return this.usuarioService.getUsuario(id);
  }

  @Put('/cambiar-contrasena')
  async updatecontrasena(@Body() usuario: { cedula: number, contrasena: string }) {
    return await this.usuarioService.updateContrasena(usuario);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/actualizar/:id')
  updateUsuario(
    @Param('id', ParseIntPipe) id: number,
    @Body() usuario: UsuariosDto,
  ) {
    return this.usuarioService.updateUsuario(id, usuario);
  }

  //Activar o desactivar usuario
  @UseGuards(AdminAuthGuard)
  @Put('/actualizar/:cedula/estado/:estado')
  async updateEstadoUsuario(@Param('cedula', ParseIntPipe) cedula: number, @Param('estado') estado: string) {
    return await this.usuarioService.updateEstadoUsuario(cedula, estado);
  }
}