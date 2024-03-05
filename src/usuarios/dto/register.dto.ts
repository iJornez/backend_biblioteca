import { IsNotEmpty, IsString, IsNumber, IsEmail} from "class-validator";
import { EstadoUsuario } from "src/estado_usuario/entities/estado_usuario.entity";
import { Role } from "src/roles/entities/role.entity";

export class registerDto{
    @IsString()
    @IsNotEmpty()
    cedula: string;

    @IsString()
    nombre : string;

    @IsString()
    apellido : string;

    @IsNumber()
    telefono : number;

    @IsEmail()
    email: string;

    estadoDelUsuario:EstadoUsuario;

    roles: Role;

    @IsNotEmpty()
    password : string;

}