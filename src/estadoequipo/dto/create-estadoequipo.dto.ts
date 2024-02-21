import { IsNotEmpty, IsString } from "class-validator";

export class CreateEstadoequipoDto {
    @IsString()
    @IsNotEmpty()
    estado: string;
}
