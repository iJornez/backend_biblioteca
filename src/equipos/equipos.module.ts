import { Module } from '@nestjs/common';
import { EquiposService } from './equipos.service';
import { EquiposController } from './equipos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipo } from './entities/equipo.entity';
import { TiposEquipos } from 'src/tipos-equipos/entities/tipos-equipos.entity';
import { EstadoequipoService } from 'src/estadoequipo/estadoequipo.service';
import { Estadoequipo } from 'src/estadoequipo/entities/estadoequipo.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Equipo,TiposEquipos, Estadoequipo])],
  controllers: [EquiposController],
  providers: [EquiposService, EstadoequipoService],
  exports: [TypeOrmModule,EquiposService, EstadoequipoService]
})
export class EquiposModule { }
