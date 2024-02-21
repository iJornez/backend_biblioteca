import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuarios } from './entities/usuarios.entity';
import { UsuariosDto } from './dto/usuarios.dto';
import { UpdateUsuariosDto } from './dto/update-usuarios.dto';

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuarios)
        private readonly usuariosRepository: Repository<Usuarios>,
    ) { }

    findOneByCedula(cedula: string){
        return this.usuariosRepository.findOneBy({cedula})
    }

    create(createUserDto: UsuariosDto ){
        return this.usuariosRepository.save(createUserDto)
    }

    Equipo(usuariosDto: UsuariosDto) {

        return this.usuariosRepository.insert(usuariosDto);
    }

    Obtener_cedula(cedula: string) {
        return this.usuariosRepository.findOneBy({ cedula: cedula });
    }

    ObtenerTodo() {
        return this.usuariosRepository.find({relations:{roles:true, estadoDelUsuario:true}});
    }

    async Actualizar(cedula: string, UpdateUsuariosDto: UpdateUsuariosDto): Promise<Usuarios> {
        const usuarios = await this.usuariosRepository.findOneBy({ cedula: cedula });

        if (!usuarios) {
            throw new NotFoundException(`El usuario con la cedula ${cedula} no existe`);
        }

        this.usuariosRepository.merge(usuarios, UpdateUsuariosDto);
        return this.usuariosRepository.save(usuarios);
    }

    ActualizarTodo(updateUsuariosDto : UpdateUsuariosDto) {
        const usuario = this.usuariosRepository.findBy({ cedula: updateUsuariosDto.cedula });
        if (!usuario) {
          throw new NotFoundException(`El usuariono existe`);
        }
        return this.usuariosRepository.update({cedula: updateUsuariosDto.cedula}, updateUsuariosDto);
      }

    EliminarUsuario(cedula) {
        return this.usuariosRepository.delete(cedula);
    }
}
