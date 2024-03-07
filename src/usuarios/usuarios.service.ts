import { BadRequestException, Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuarios } from './entities/usuarios.entity';
import * as bcryptjs from 'bcryptjs';
import { registerDto } from './dto/register.dto';

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuarios)
        private readonly usuariosRepository: Repository<Usuarios>,
    ) { }

    async findOneByCedula(cedula: string){
        return await this.usuariosRepository.findOneBy({cedula})
    }

    async registerIn({ cedula, nombre, apellido, telefono, email, estadoDelUsuario, password, roles }: registerDto) {
        try {
            const user = await this.findOneByCedula(cedula);
            if (user) {
                throw new BadRequestException('Usuario ya existe!');
            }

            const hashedPassword = await bcryptjs.hash(password, 10);
            const newUser = this.usuariosRepository.create({
                cedula,
                nombre,
                apellido,
                telefono,
                email,
                estadoDelUsuario,
                password: hashedPassword,
                roles
            });
            await this.usuariosRepository.save(newUser);
            return newUser;
        } catch (error) {
            throw new BadRequestException('Error al registrar usuario.');
        }
    }

    Obtener_cedula(cedula: string) {
        return this.usuariosRepository.findOneBy({ cedula: cedula });
    }

    ObtenerTodo() {
        return this.usuariosRepository.find({relations:{roles:true, estadoDelUsuario:true}});
    }

    async Actualizar( cedula: string,usuarioDto: registerDto): Promise<Usuarios> {
        const usuarios = await this.usuariosRepository.findOneBy({ cedula: usuarioDto.cedula });

        if (!usuarios) {
            throw new NotFoundException(`El usuario con la cedula ${usuarioDto.cedula} no existe`);
        }

        usuarios.nombre = usuarioDto.nombre;
        usuarios.apellido = usuarioDto.apellido;
        usuarios.telefono = usuarioDto.telefono;
        usuarios.email = usuarioDto.email;
        usuarios.estadoDelUsuario = usuarioDto.estadoDelUsuario;
        usuarios.roles = usuarioDto.roles;
        usuarios.password = usuarioDto.password; 
        
        return this.usuariosRepository.save(usuarios);
    }

    EliminarUsuario(cedula) {
        return this.usuariosRepository.delete(cedula);
    }
}
