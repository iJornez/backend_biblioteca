import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { rolesDto } from './dto/roles.dto';
import { UpdateRolDto } from './dto/update-rolesdto';
import { Role } from './entities/role.entity';
import { AdminAuthGuard } from 'src/guard/admin.guard';


@UseGuards(AdminAuthGuard)
@Controller('roles')
export class RolesEntity {
  constructor(private readonly rolesService: RolesService) { }

  @Post('/crear')
  CrearRol(@Body() createRolDto: rolesDto) {
    return this.rolesService.CrearRol(createRolDto);
  }

  @Get('/obtener')
  obtener(): Promise<Role[]> {
    return this.rolesService.obtener();
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
