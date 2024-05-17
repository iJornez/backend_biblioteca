import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class UsuariosDto {

    @IsString()
    @IsNotEmpty()
    @Matches(/^(?!\s*$).+/, { message: 'El nombre no puede estar vacío' })
    @MinLength(1)
    @MaxLength(80)
    readonly nombre?: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^(?!\s*$).+/, { message: 'El apellido no puede estar vacío' })
    @MinLength(1)
    @MaxLength(80)
    readonly apellido?: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^(?!\s*$).+/, { message: 'El telefono no puede estar vacío' })
    readonly telefono?: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^(?!\s*$).+/, { message: 'El email no puede estar vacío' })
    @MinLength(1)
    @MaxLength(50)
    readonly email?: string;


}

