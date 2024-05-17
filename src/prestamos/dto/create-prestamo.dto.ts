import { IsArray, IsDateString, IsNotEmpty, IsNumber } from "class-validator";
import { Usuarios } from "src/usuarios/entities/usuarios.entity";

export class CreatePrestamoDto {

    @IsDateString()
    @IsNotEmpty()
    readonly fecha_prestamo: Date;

    @IsDateString()
    @IsNotEmpty()
    readonly fecha_devolucion: Date;

    @IsNotEmpty({ message: 'El usuario no puede estar vacío' })
    readonly usuario: Usuarios;

    @IsArray({ message: 'Debe ser un arreglo' })
    readonly detalle: PrestamoDetallePrestamoDto[];

}

export class PrestamoDetallePrestamoDto {
    @IsNumber()
    readonly tipo_equipo: number;

    @IsNumber()
    readonly cantidad: number;
}
