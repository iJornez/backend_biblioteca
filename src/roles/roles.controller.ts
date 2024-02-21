import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { rolesDto } from './dto/roles.dto';
import { UpdateRolDto } from './dto/update-rolesdto';
import { Role } from './entities/role.entity';

@Controller('roles')
export class RolesEntity {
  constructor(private readonly rolesService: RolesService) { }

  @Post('/crear')
  Estado(@Body() TiposEquipos: rolesDto) {
    return this.rolesService.Estado(TiposEquipos);
  }

  @Get('/obtener')
  obtener() {
    return this.rolesService.obtener();
  }

  @Get('/obtener_rol/:id')
  Obtener_rol_By_Id(@Param('id') id: number) {
    return this.rolesService.Obtener_id(id);
  }

  @Put('/actualizar/:id')
  Actualizar_rol(@Param('id') id: number, @Body() updateRolDto: UpdateRolDto): Promise<Role> {
    return this.rolesService.Actualizar(id, updateRolDto);

  }

  @Delete('eliminar/:id')
  Eliminar(@Param('id') id: number) {
    return this.rolesService.EliminarEstado(id);
  }
}
