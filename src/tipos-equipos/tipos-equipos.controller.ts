import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AdminAuthGuard } from 'src/guard/admin.guard';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { TiposEquipos } from './entities/tipos-equipos.entity';
import { TiposEquiposDto } from './dto/tipos-equipos.Dto';

import { UpdateTipoEquipoDto } from './dto/update-tipoequipo.dto';
import { TipoEquipoService } from './tipos-equipos.service';


@Controller('tipo-equipo')
export class TipoEquipoController {
  constructor(private readonly tipoEquipoService: TipoEquipoService) { }

  @UseGuards(AdminAuthGuard)
  @Post('/crear')
  async createTipoEquipo(@Body() newTipoEquipoDto: TiposEquiposDto) {
    return await this.tipoEquipoService.createTipoEquipo(newTipoEquipoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getTipoEquipos(): Promise<TiposEquipos[]> {
    return await this.tipoEquipoService.getTipoEquipos();
  }

  @UseGuards(AdminAuthGuard)
  @Get('/tipo/:tipo')
  async getPorTipo(@Param('tipo') tipo: string) {
    return await this.tipoEquipoService.getPorTipo(tipo);
  }

  @UseGuards(AdminAuthGuard)
  @Put('/actualizar/:id')
  async updateTipoEquipo(
    @Param('id', ParseIntPipe) id: number,
    @Body() tipoEquipo: UpdateTipoEquipoDto,
  ) {
    return await this.tipoEquipoService.updateTipoEquipo(id, tipoEquipo);
  }

  @UseGuards(AdminAuthGuard)
  @Delete('/:id')
  async deleteTipoEquipo(@Param('id', ParseIntPipe) id: number) {
    return await this.tipoEquipoService.deleteTipoEquipo(id);
  }
}
