import { Module } from '@nestjs/common';
import { EstadoprestamoService } from './estadoprestamo.service';
import { EstadoprestamoController } from './estadoprestamo.controller';
import { Estadoprestamo } from './entity/estadoprestamo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Estadoprestamo])],
  controllers: [EstadoprestamoController],
  providers: [EstadoprestamoService],
  exports: [TypeOrmModule],
})
export class EstadoprestamoModule { }
