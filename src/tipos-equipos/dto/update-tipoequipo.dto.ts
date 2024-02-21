import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty } from "class-validator";
import { TiposEquipos } from "../entities/tipos-equipos.entity";
import { Equipo } from "src/equipos/entities/equipo.entity";


export class UpdateTipoEquipoDto extends PartialType(TiposEquipos) {

  @IsNotEmpty()
  id: number;
  tipo:string;
  equipo_tipo: Equipo[];

}