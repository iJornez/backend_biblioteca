import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { EstadoequipoService } from './estadoequipo.service';
import { CreateEstadoequipoDto } from './dto/create-estadoequipo.dto';
import { UpdateEstadoEquipoDto } from './dto/update-estadoequipo.dto';
import { Estadoequipo } from './entities/estadoequipo.entity';
import { AdminAuthGuard } from 'src/guard/admin.guard';

@UseGuards(AdminAuthGuard)
@Controller('estadoequipo')
export class EstadoequipoController {
  constructor(private readonly estadoequipoService: EstadoequipoService) { }

  @Post('/crear')
  Estado(@Body() estadoequipo: CreateEstadoequipoDto) {
    return this.estadoequipoService.Estado(estadoequipo);
  }

  @Get('/obtener')
  obtener() {
    return this.estadoequipoService.obtener();
  }
  @Get('/obtener_estadoequipo/:id')
  Obtener_Estado_By_Id(@Param('id') id: number) {
    return this.estadoequipoService.Obtener_id(id);
  }

  @Put('/actualizar/:id')
  Actualizar_estado_equipo(@Param('id', ParseIntPipe) id: number, @Body() UpdateEstadoEquipoDto: UpdateEstadoEquipoDto) {
    return this.estadoequipoService.Actualizar(id, UpdateEstadoEquipoDto);
  }

  @Delete('eliminar/:id')
  Eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.estadoequipoService.EliminarEstado(id);
  }
}
