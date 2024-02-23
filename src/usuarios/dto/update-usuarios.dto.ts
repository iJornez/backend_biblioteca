import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty } from "class-validator";
import { UsuariosDto } from "./usuarios.dto";
import { Role } from "src/roles/entities/role.entity";
import { EstadoUsuario } from "src/estado_usuario/entities/estado_usuario.entity";
import { Prestamo } from "src/prestamos/entities/prestamo.entity";


export class UpdateUsuariosDto extends PartialType(UsuariosDto) {

  @IsNotEmpty()
  cedula: string;
  nombre: string;
  apellido: string;
  telefono: number;
  email: string;

  estadoDelUsuario: EstadoUsuario[];
  roles: Role;
  prestamos_usuario: Prestamo[];


}