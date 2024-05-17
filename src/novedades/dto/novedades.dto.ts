import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Equipo } from "src/equipos/entities/equipo.entity";
import { Prestamo } from "src/prestamos/entities/prestamo.entity";

export class CrearNovedadesDto {

    @IsString()
    @IsNotEmpty()
    @Matches(/^(?!\s*$).+/, { message: 'El Estado no puede ser estar vacío' })
    @MinLength(1)
    @MaxLength(256)
    readonly descripcion: string;

    @IsNotEmpty()
    readonly prestamo: Prestamo;

    @IsNotEmpty()
    readonly equipo: Equipo;


}