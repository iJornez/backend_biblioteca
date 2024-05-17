import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class EntregaDto {
    @IsNumber()
    readonly idPrestamo: number;

    @IsArray()
    readonly equipos: EntregaEquiposDto[];
}
export class EntregaEquiposDto {

    @IsString()
    readonly idEquipo: string;

    @IsNumber()
    readonly estado_equipo: number;

    @IsOptional()
    readonly observacion: string;
}