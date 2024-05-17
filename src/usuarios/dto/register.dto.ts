import { IsNotEmpty, IsString, IsNumber, IsEmail, Matches } from "class-validator";

import { Role } from "src/roles/entities/role.entity";

export class registerDto {
    @IsNumber()
    readonly cedula: number;

    @Matches(/^(?!\s*$).+/, { message: 'El nombre no puede estar vacío' })
    @IsString()
    readonly nombre: string;

    @Matches(/^(?!\s*$).+/, { message: 'El apellido no puede estar vacío' })
    @IsString()
    readonly apellido: string;

    @Matches(/^(?!\s*$).+/, { message: 'El teléfono no puede estar vacío' })
    @IsString()
    readonly telefono: string;

    @Matches(/^(?!\s*$).+/, { message: 'El correo no puede estar vacío' })
    @IsEmail()
    readonly email: string;

    @IsNotEmpty({ message: 'Debe enviar un rol' })
    readonly roles: Role;

    @Matches(/^(?!\s*$).+/, { message: 'La contrasena no puede estar vacía' })
    @IsNotEmpty()
    readonly password: string;

}

export class LoginDto {
    @IsNotEmpty()
    readonly cedula: number;

    @IsNotEmpty()
    readonly password: string;
}