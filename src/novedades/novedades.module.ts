import { Module } from '@nestjs/common';
import { NovedadesService } from './novedades.service';
import { NovedadesController } from './novedades.controller';
import { Novedades } from './entities/novedades.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipo } from 'src/equipos/entities/equipo.entity';
import { Prestamo } from 'src/prestamos/entities/prestamo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Novedades, Equipo, Prestamo])],
  controllers: [NovedadesController],
  providers: [NovedadesService],
  exports:[TypeOrmModule, NovedadesService]
})
export class NovedadesModule { }
