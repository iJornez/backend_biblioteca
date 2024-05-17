import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposEquipos } from './entities/tipos-equipos.entity';
import { TipoEquipoController } from './tipos-equipos.controller';
import { TipoEquipoService } from './tipos-equipos.service';

@Module({
  imports: [TypeOrmModule.forFeature([TiposEquipos])],
  controllers: [TipoEquipoController],
  providers: [TipoEquipoService]
})
export class TiposEquiposModule { }
