import { IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";



export class UpdateEquipoDto{

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'El serial no puede estar vacío' })
  @MinLength(1)
  @MaxLength(30)
  readonly serial: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!\s*$).+/, { message: 'La marca no puede estar vacía' })
  @MinLength(1)
  @MaxLength(255)
  readonly marca: string;

  @IsNumber()
  readonly estado: number;
}