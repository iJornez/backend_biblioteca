import { PartialType } from "@nestjs/mapped-types";
import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { CreateCatDto } from "src/estadoprestamo/Dto/CreateCat.Dto";


export class UpdateEstadoPrestamoDto extends PartialType(CreateCatDto) {
  @IsInt()
  @IsNotEmpty()
  id: number;

}