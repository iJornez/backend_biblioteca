import { IsNotEmpty, IsNumber } from "class-validator";
import { Equipo } from "src/equipos/entities/equipo.entity";
import { Prestamo } from "src/prestamos/entities/prestamo.entity";

export class UpdateDetallePrestamoDto {

    @IsNumber()
    @IsNotEmpty()
    readonly id: number;

    @IsNumber()
    @IsNotEmpty()
    readonly prestamo?: Prestamo;

    @IsNumber()
    @IsNotEmpty()
    readonly equipo?: Equipo;
}