import { Module } from '@nestjs/common';
import { DetallePrestamoService } from './detalle-prestamo.service';
import { DetallePrestamoController } from './detalle-prestamo.controller';
import { detallePrestamo } from './entities/detalle-prestamo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([detallePrestamo])],
  controllers: [DetallePrestamoController],
  providers: [DetallePrestamoService],
  exports:[DetallePrestamoService,TypeOrmModule]

})
export class DetallePrestamoModule { }
