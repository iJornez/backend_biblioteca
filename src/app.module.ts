import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoprestamoModule } from './estadoprestamo/estadoprestamo.module';
import { Estadoprestamo } from './estadoprestamo/entity/estadoprestamo.entity';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/entities/role.entity';
import { TiposEquiposModule } from './tipos-equipos/tipos-equipos.module';
import { EstadoequipoModule } from './estadoequipo/estadoequipo.module';
import { TiposEquipos } from './tipos-equipos/entities/tipos-equipos.entity';
import { Estadoequipo } from './estadoequipo/entities/estadoequipo.entity';
import { NovedadesModule } from './novedades/novedades.module';
import { Novedades } from './novedades/entities/novedades.entity';
import { Equipo } from './equipos/entities/equipo.entity';
import { detallePrestamo } from './detalle-prestamo/entities/detalle-prestamo.entity';
import { EquiposModule } from './equipos/equipos.module';
import { DetallePrestamoModule } from './detalle-prestamo/detalle-prestamo.module';
import { PrestamosModule } from './prestamos/prestamos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { Prestamo } from './prestamos/entities/prestamo.entity';
import { Usuarios } from './usuarios/entities/usuarios.entity';
import { EstadoUsuarioModule } from './estado_usuario/estado_usuario.module';
import { EstadoUsuario } from './estado_usuario/entities/estado_usuario.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'biblioteca',
      entities: [Estadoprestamo, Role, TiposEquipos, Estadoequipo, Novedades, Equipo, detallePrestamo, Prestamo,EstadoUsuario, Usuarios],
      synchronize: true,
      autoLoadEntities: true,
    }),

    EstadoprestamoModule,

    RolesModule,

    TiposEquiposModule,

    EstadoequipoModule,

    NovedadesModule,

    EquiposModule,

    DetallePrestamoModule,

    PrestamosModule,

    UsuariosModule,

    EstadoUsuarioModule,

    AuthModule

  ],
  controllers: [AppController],
  providers: [AppService],
  exports:[TypeOrmModule]
})
export class AppModule { }
