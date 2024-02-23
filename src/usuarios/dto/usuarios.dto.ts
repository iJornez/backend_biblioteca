import { Role } from "src/roles/entities/role.entity";

export class UsuariosDto {
    cedula: string;
    nombre: string;
    apellido: string;
    telefono: number;
    email: string;
    password: string;
    roles: Role;

}

