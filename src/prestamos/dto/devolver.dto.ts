import { IsArray, IsNumber } from "class-validator";

export class DevolverDto {
    @IsNumber()
    readonly idPrestamo: number;

    @IsArray()
    readonly equipos: EntregaEquipoDto[];
}
export class EntregaEquipoDto {
    readonly idEquipo: number;

    readonly idEstado: number;

    readonly descripcion: string;
}