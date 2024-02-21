import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty } from "class-validator";
import { CreateCatDto } from "src/estadoprestamo/Dto/CreateCat.Dto";


export class UpdateEquipoDto extends PartialType(CreateCatDto) {

  @IsNotEmpty()
  codigo: number;
  serial: string;
  descripcion: string;

}