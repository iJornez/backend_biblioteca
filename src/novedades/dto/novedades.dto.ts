import { Equipo } from "src/equipos/entities/equipo.entity";
import { Prestamo } from "src/prestamos/entities/prestamo.entity";

export class NovedadesDto {
    id: number;
    descripcion: string;

}

export class CrearNovedadesDto{
    readonly prestamo: Prestamo;

    readonly equipo: Equipo;

    readonly descripcion: string;
}