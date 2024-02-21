import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { UpdateRolDto } from './dto/update-rolesdto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolestables: Repository<Role>,
  ) { }

  Estado(TiposEquipos) {
    return this.rolestables.insert(TiposEquipos);
  }
  obtener() {
    return this.rolestables.find();
  }
  Obtener_id(id: number) {
    return this.rolestables.findOneBy({ id: id });
  }

  async Actualizar(id: number, UpdateRolDto: UpdateRolDto): Promise<Role> {
    const roles = await this.rolestables.findOneBy({ id: id });

    if (!roles) {
      throw new NotFoundException(`El rol con el ID ${id} no existe`);
    }

    this.rolestables.merge(roles, UpdateRolDto);
    return this.rolestables.save(roles);
  }

  EliminarEstado(id: number) {
    return this.rolestables.delete({ id: id });
  }
}
