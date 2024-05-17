import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class TiposEquiposDto {
  
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El tipo de equipo no puede estar vacío' })
  @MinLength(1)
  @MaxLength(30)
  readonly tipo: string;
}
