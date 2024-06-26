import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { TiposEquipos } from "../entities/tipos-equipos.entity";


export class UpdateTipoEquipoDto extends PartialType(TiposEquipos) {

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El tipo de equipo no puede estar vacío' })
  @MinLength(1)
  @MaxLength(30)
  readonly tipo?: string;


}