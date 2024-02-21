import { Module } from '@nestjs/common';
import { EstadoUsuarioService } from './estado_usuario.service';
import { EstadoUsuarioController } from './estado_usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoUsuario } from './entities/estado_usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstadoUsuario])],
  controllers: [EstadoUsuarioController],
  providers: [EstadoUsuarioService],
  exports: [TypeOrmModule],
})
export class EstadoUsuarioModule {}
