import { Module } from "@nestjs/common";

import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EstadoprestamoModule } from "./estadoprestamo/estadoprestamo.module";
import { RolesModule } from "./roles/roles.module";
import { TiposEquiposModule } from "./tipos-equipos/tipos-equipos.module";
import { EstadoequipoModule } from "./estadoequipo/estadoequipo.module";
import { NovedadesModule } from "./novedades/novedades.module";
import { EquiposModule } from "./equipos/equipos.module";
import { DetallePrestamoModule } from "./detalle-prestamo/detalle-prestamo.module";
import { PrestamosModule } from "./prestamos/prestamos.module";
import { AuthModule } from "./auth/auth.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { join } from "path";
import { DataSource } from "typeorm";
import { UsuarioModule } from "./usuarios/usuarios.module";
import { ConfigModule, ConfigService } from "@nestjs/config";


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'templates'),
      serveRoot: '/public/'
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        connectTimeout: 40000,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    EstadoprestamoModule,
    RolesModule,
    TiposEquiposModule,
    EstadoequipoModule,
    NovedadesModule,
    EquiposModule,
    DetallePrestamoModule,
    PrestamosModule,
    UsuarioModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [TypeOrmModule]
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
