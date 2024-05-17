import { IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Estadoequipo } from "src/estadoequipo/entities/estadoequipo.entity";
import { TiposEquipos } from "src/tipos-equipos/entities/tipos-equipos.entity";

export class CreateEquipoDto {

  @IsOptional()
  readonly codigo_telefonica: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'La marca no puede ser estar vacía' })
  @MinLength(1)
  @MaxLength(45)
  readonly marca: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El Estado no puede ser estar vacía' })
  @MinLength(1)
  @MaxLength(30)
  readonly serial: string;


  @IsNotEmpty()
  readonly tipo: TiposEquipos;
}
