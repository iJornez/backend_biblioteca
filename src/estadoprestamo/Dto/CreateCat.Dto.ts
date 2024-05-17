import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateCatDto {

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El Estado no puede ser estar vacío' })
  @MinLength(1)
  @MaxLength(15)
  estado: string;
}
