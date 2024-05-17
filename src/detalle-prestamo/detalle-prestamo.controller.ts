import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { DetallePrestamoService } from './detalle-prestamo.service';
import { CreateDetallePrestamoDto } from './dto/create-detalle-prestamo.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { detallePrestamo } from './entities/detalle-prestamo.entity';
import { AdminAuthGuard } from 'src/guard/admin.guard';
import { UpdateDetallePrestamoDto } from './dto/update-detalle-prestamo.dto';

@Controller('detalle-prestamo')
export class DetallePrestamoController {
  constructor(
    private readonly detallePrestamoService: DetallePrestamoService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get('/:idPrestamo')
  async getDetallePrestamo(@Param('idPrestamo', ParseIntPipe) idPrestamo: number): Promise<detallePrestamo[]> {
    return await this.detallePrestamoService.getDetallePrestamo(idPrestamo);
  }

  @UseGuards(AdminAuthGuard)
  @Put('/actualizar/:id')
  updateDetallePrestamo(@Param('id', ParseIntPipe) id: number, @Body() updateDetallePrestamo: UpdateDetallePrestamoDto) {
    return this.detallePrestamoService.updateDetallePrestamo(id, updateDetallePrestamo);
  }

  @UseGuards(AdminAuthGuard)
  @Delete('/:id')
  async deleteDetallePrestamo(@Param('id', ParseIntPipe) id:number){
    return await this.detallePrestamoService.deleteDetallePrestamo(id);
  }
}
