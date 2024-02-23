import { IsNotEmpty, IsString, IsNumber, IsEmail} from "class-validator";
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

    roles: Role;

    @IsNotEmpty()
    password : string;

}