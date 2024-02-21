import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstadoUsuarioDto } from './dto/create-estado_usuario.dto';
import { UpdateEstadoUsuarioDto } from './dto/update-estado_usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadoUsuario } from './entities/estado_usuario.entity';
import { Repository } from 'typeorm';



@Injectable()
export class EstadoUsuarioService {
  constructor(
    @InjectRepository(EstadoUsuario)
    private readonly estadousuariRepository: Repository<EstadoUsuario>,
  ) { }

  async Estado(tipo: CreateEstadoUsuarioDto): Promise<void> {
    const newtipo = this.estadousuariRepository.create();
    await this.estadousuariRepository.save(newtipo);
    console.log('hola´');
  }
  Obtener_id(id: number) {
    return this.estadousuariRepository.findOneBy({ id: id });
  }
  
  ObtenerTodo() {
    return this.estadousuariRepository.find();
  }
  
  async Actualizar(id: number, UpdateEstadoUsuarioDto: UpdateEstadoUsuarioDto): Promise<EstadoUsuario> {
    const estadousuario = await this.estadousuariRepository.findOneBy({ id: id });

    if (!estadousuario) {
      throw new NotFoundException(`El Estado del prestamo con el ID ${id} no existe`);
    }

    this.estadousuariRepository.merge(estadousuario, UpdateEstadoUsuarioDto);
    return this.estadousuariRepository.save(estadousuario);
  }

  async actualizarTodo(CreateEstadoUsuarioDto : CreateEstadoUsuarioDto){
    const estadoUsuario = this.estadousuariRepository.findBy({ id: CreateEstadoUsuarioDto.id });
    if (!estadoUsuario) {
      throw new NotFoundException(`El Estado no existe`);
    }
    return this.estadousuariRepository.update({id: CreateEstadoUsuarioDto.id}, CreateEstadoUsuarioDto);
  }


  
}