import { PartialType } from "@nestjs/mapped-types";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateCatDto } from "src/estadoprestamo/Dto/CreateCat.Dto";


export class UpdateEstadoEquipoDto extends PartialType(CreateCatDto) {

  @IsInt()
  @IsNotEmpty()
  id: number;

}