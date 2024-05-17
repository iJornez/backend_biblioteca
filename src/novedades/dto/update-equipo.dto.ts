import { IsBoolean, IsDate, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UpdateNovedadDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El Estado no puede ser estar vacío' })
  @MinLength(1)
  @MaxLength(256)
  readonly descripcion?: string;

  @IsDate()
  @IsNotEmpty()
  readonly fecha_novedad?: Date;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El Estado no puede ser estar vacío' })
  @MinLength(1)
  @MaxLength(256)
  readonly tipo_novedad?: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly estado_novedad?: boolean;
}