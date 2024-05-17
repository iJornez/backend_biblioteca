import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UpdateRolDto {

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El Estado no puede ser estar vacío' })
  @MinLength(1)
  @MaxLength(20)
  readonly descripcion?: string;

}