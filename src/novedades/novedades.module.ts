import { Module } from '@nestjs/common';
import { NovedadesService } from './novedades.service';
import { NovedadesController } from './novedades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Novedades } from './entities/novedades.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Novedades])],
  controllers: [NovedadesController],
  providers: [NovedadesService],
  exports:[TypeOrmModule, NovedadesService]
})
export class NovedadesModule { }
