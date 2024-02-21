import { Module } from '@nestjs/common';
import { TiposEquiposService } from './tipos-equipos.service';
import { TiposEquiposController } from './tipos-equipos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposEquipos } from './entities/tipos-equipos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TiposEquipos])],
  controllers: [TiposEquiposController],
  providers: [TiposEquiposService]
})
export class TiposEquiposModule { }
