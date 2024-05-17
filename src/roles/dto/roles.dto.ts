import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class rolesDto {

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El estado no puede estar vacío' })
  @MinLength(1)
  @MaxLength(20)
  readonly descripcion: string;
}
