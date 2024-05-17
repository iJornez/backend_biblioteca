import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-strategy.interface';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuarios } from 'src/usuarios/entities/usuarios.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(

    @Inject(JwtService) private jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(Usuarios) private usuarioRepository: Repository<Usuarios>
  ) {
    super({
      secretOrKey: configService.get<string>('SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(
    payload: JwtPayload,
  ): Promise<Usuarios | { access_token: string }> {
    const { cedula } = payload;
    const userBd = await this.usuarioRepository.find({
      where: { cedula: cedula },
      relations: {
        rol: true
      }
    });
    if (userBd.length == 0) {
      throw new UnauthorizedException('El usuario no esta registrado');
    }
    const payloadZ = {
      sub: userBd[0].cedula,
      cedula: userBd[0].cedula,
      usuario: userBd[0].nombre,
      rol: (userBd[0].rol == null) ? 'Sin Rol' : userBd[0].rol.descripcion,
      id_rol: userBd[0].rol.id
    };
    return {
      ...userBd,
      access_token: await this.jwtService.signAsync(payloadZ),
    };
  }

  async loginJwt(payload: JwtPayload): Promise<any> {
    const { cedula, password } = payload;

    if (cedula == null && password == null) {
      return new BadRequestException("Escriba los datos correctamente!");
    }

    const userBd = await this.usuarioRepository.find({
      where: {
        cedula: cedula
      },
      relations: {
        rol: true
      },
      select: [
        'cedula',
        'nombre',
        'apellido',
        'email',
        'password',
        'rol',
        'telefono',
        'estadoDelUsuario'
      ],
    });
    console.log(userBd);
    if (userBd.length == 0) {
      throw new UnauthorizedException('El usuario no esta registrado');
    } else {
      if (userBd[0].estadoDelUsuario != 'Activo') {
        throw new UnauthorizedException('No tiene permisos para acceder');
      } else if (!bcrypt.compareSync(password, userBd[0].password)) {
        throw new UnauthorizedException('La contraseña es incorrecta');
      }
    }
    const payloadZ = {
      cedula: userBd[0].cedula,
      nombre: userBd[0].nombre,
      rol: (userBd[0].rol == null) ? 'Sin Rol' : userBd[0].rol.descripcion,
    };
    delete userBd[0].password;
    const userReturn = {
      rol: (userBd[0].rol == null) ? 'Sin Rol' : userBd[0].rol.descripcion,
      access_token: await this.jwtService.signAsync(payloadZ),
    };
    if (userReturn === null) {
      throw new UnauthorizedException('Ingrese credenciales validas!')
    } else {
      return userReturn;
    }

  }
}