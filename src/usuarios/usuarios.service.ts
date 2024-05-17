import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { MailerService } from "@nestjs-modules/mailer";
import { Usuarios } from "./entities/usuarios.entity";
import { registerDto } from "./dto/register.dto";
import * as bcrypt from "bcrypt";
import * as moment from "moment-timezone";
import { UsuariosDto } from "./dto/update-usuario.dto";
import { TokenStrategy } from "./strategies/token.strategy";

@Injectable()
export class UsuarioService {
    constructor(
        @Inject(TokenStrategy) private tokenStrategy: TokenStrategy,
        @InjectRepository(Usuarios) private usuarioRepository: Repository<Usuarios>,
        private configService: ConfigService,
        private readonly mailerService: MailerService
    ) { }

    async createUsuario(usuario: registerDto) {
        const existUsuario = await this.usuarioExist(usuario.cedula);
        if (!existUsuario) {
            const existEmail = await this.emailExist(usuario.email);
            if (!existEmail) {
                const salt = 10;
                const hash = bcrypt.hashSync(usuario.password, salt);

                return await this.usuarioRepository.insert({ ...usuario, password: hash }).then(usuario => {
                    return usuario != null ? { creado: true, message: 'Usuario creado', ex: null } : { creado: false, message: 'No se pudo crear el usuario', ex: usuario };
                }).catch(error => {
                    return {
                        creado: false,
                        message: 'Sucedió un error creando el usuario',
                        ex: error
                    }
                });
            } else {
                return {
                    creado: false,
                    message: 'Este correo ya existe, usa otro',
                    ex: null
                }
            }
        }
        return {
            creado: false,
            message: "Ya existe un usuario con esa cédula",
            ex: null
        };
    }

    async updateContrasena(newDatos: { cedula: number, contrasena: string }) {
        const usuarioBD = await this.usuarioRepository.findOne({
            where: { cedula: newDatos.cedula },
        });
        if (usuarioBD != null) {
            if (usuarioBD.token_recuperacion != null) {
                const salt = 10;
                const hash = bcrypt.hashSync(newDatos.contrasena, salt);
                usuarioBD.password = hash;
                usuarioBD.token_recuperacion = null;
                return await this.usuarioRepository.save(usuarioBD).then(usuario => {
                    return usuario != null ? { actualizado: true, message: 'Contraseña actualizada', ex: null } : { actualizado: false, message: 'No se pudo actualizar la contraseña', ex: usuario };
                }).catch(error => {
                    return {
                        actualizado: false,
                        message: 'Sucedió un error actualizando la contraseña',
                        ex: error
                    }
                });
            }
            return {
                actualizado: false,
                message: 'No ha solicitado recuperar su contraseña',
                ex: null
            }
        }
        return {
            actualizado: false,
            message: "No existe ningún usuario con ese número de cédula",
            ex: null
        };
    }

    async recuperarContrasena(email: string): Promise<any> {
        const usuario = await this.usuarioRepository.findOne({ where: { email: email, estadoDelUsuario: 'Activo' } });

        if (usuario == null) {
            return {
                success: false,
                message: "No se encontró ningún usuario con ese correo electrónico",
            };
        }

        const token = await this.tokenStrategy.generateToken({ cedula: usuario.cedula });
        return await this.mailerService.sendMail({
            to: email,
            subject: "Recuperación de contraseña",
            template: 'correo-recuperacion',
            context: {
                nombres: `${usuario.nombre} ${usuario.apellido}`,
                linkRecuperacion: `${this.configService.get<string>('ENDPOINT_FRONTEND')})}${usuario.cedula}/${token}`,
            }
        }).then((send) => {
            return send.accepted.length > 0 ? {
                success: true,
                message: 'Se ha enviado un correo electrónico con instrucciones para restablecer la contraseña',
            } : {
                success: false,
                message: "No se ha podido enviar el correo electrónico",
            };
        }).catch(error => {
            return {
                success: false,
                message: "Sucedió un error enviando el correo",
                ex: error
            }
        });
    }

    async puedeRecuperar(cedula: number, token: string) {
        const usuario = await this.usuarioRepository.findOne({ where: { cedula: cedula, estadoDelUsuario: 'Activo' } });
        if (usuario == null) {
            return {
                puede: false,
                message: "No existe el usuario",
                ex: null
            };
        }
        const isValidToken = await this.tokenStrategy.validateToken(token);
        return isValidToken ? {
            puede: token,
            message: null,
            ex: null
        } : {
            puede: false,
            message: "Tiempo vencido, vuelva a enviar otra solicitud de recuperación",
            ex: null
        };
    }

    async getUsuarios() {
        return await this.usuarioRepository.find({
            relations: ["rol"],
            select: [
                "cedula",
                "nombre",
                "apellido",
                "email",
                "telefono",
                "rol",
                "estadoDelUsuario",
                "prestamos_usuario",
            ],
        });
    }

    async getInstructores() {
        return await this.usuarioRepository.find({
            relations: ["rol"],
            select: [
                "cedula",
                "nombre",
                "apellido",
                "email",
                "telefono",
                "rol",
                "prestamos_usuario"
            ],
            where: { rol: { descripcion: "Instructor" }, estadoDelUsuario: 'Activo' },
        });
    }
    getUsuario(id: number) {
        return this.usuarioRepository.findOne({
            where: {
                cedula: id,
            },
            relations: ["rol"],
            select: [
                "cedula",
                "nombre",
                "apellido",
                "email",
                "telefono",
                "rol",
                "prestamos_usuario"
            ],
        });
    }

    deleteUsuario(id: number) {
        return this.usuarioRepository.delete({ cedula: id });
    }

    updateUsuario(id: number, usuario: UsuariosDto) {
        return this.usuarioRepository.update({ cedula: id }, usuario);
    }

    async updateEstadoUsuario(cedula: number, newEstado: string) {
        return await this.usuarioRepository.update({ cedula: cedula }, { estadoDelUsuario: newEstado }).then(usuario => {
            return usuario.affected == 1 ? { actualizado: true, message: 'Usuario actualizado', ex: null } : { actualizado: false, message: 'No se pudo actualizar, el usuario no existe', ex: usuario };
        }).catch(error => {
            return {
                actualizado: false,
                message: 'Sucedió un error actualizando el usuario',
                ex: error
            }
        });
    }

    async usuarioExist(cedula: number): Promise<boolean> {
        return await this.usuarioRepository
            .find({ where: { cedula: cedula } })
            .then((usuario) => usuario.length > 0)
            .catch(() => {
                return false;
            });
    }

    async emailExist(email: string): Promise<boolean> {
        return await this.usuarioRepository
            .find({ where: { email: email } })
            .then((usuario) => usuario.length > 0)
            .catch(() => {
                return false;
            });
    }
}

