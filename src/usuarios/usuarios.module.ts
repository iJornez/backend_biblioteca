import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Usuarios } from './entities/usuarios.entity';
import { UsuarioController } from './usuarios.controller';
import { UsuarioService } from './usuarios.service';
import { TokenStrategy } from './strategies/token.strategy';


@Module({
  imports: [
    TypeOrmModule.forFeature([Usuarios]),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('HOST_EMAIL'),
          port: 587,
          secure: false,
          auth: {
            user: configService.get<string>('EMAIL_REMITENTE'),
            pass: configService.get<string>('PASSWORD_EMAIL_REMITENTE'),
          },
        },
        defaults: {
          from: `'Biblioteca SENA' ${configService.get<string>('EMAIL_REMITENTE')}`,
        },
        template: {
          dir: './templates/',
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService]
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET'),
        signOptions: {
          expiresIn: '1h',
        },
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService, TokenStrategy],
  exports: [TypeOrmModule, MailerModule, PassportModule, JwtModule],
})
export class UsuarioModule { }