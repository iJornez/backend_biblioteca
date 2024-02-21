import { Module } from '@nestjs/common';
import { EstadoequipoService } from './estadoequipo.service';
import { EstadoequipoController } from './estadoequipo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estadoequipo } from './entities/estadoequipo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estadoequipo])],
  controllers: [EstadoequipoController],
  providers: [EstadoequipoService],
})
export class EstadoequipoModule { }
