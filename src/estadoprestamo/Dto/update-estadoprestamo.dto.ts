import { PartialType } from "@nestjs/mapped-types";
import { IsInt, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { CreateCatDto } from "src/estadoprestamo/dto/CreateCat.Dto";


export class UpdateEstadoPrestamoDto extends PartialType(CreateCatDto) {

  @IsInt()
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El Estado no puede ser estar vacío' })
  @MinLength(1)
  @MaxLength(15)
  readonly estado: string;

}