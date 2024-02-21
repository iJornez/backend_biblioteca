import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty } from "class-validator";
import { NovedadesDto } from "./novedades.dto";


export class UpdateNovedadDto extends PartialType(NovedadesDto) {

  @IsNotEmpty()
  id: number;
  descripcion: string;

}