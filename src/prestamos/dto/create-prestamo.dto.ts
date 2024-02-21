import { Usuarios } from "src/usuarios/entities/usuarios.entity";


export class CreatePrestamoDto {
    fecha_prestamo: Date;
    fecha_devolucion: Date;
    usuario: string;
    estado_prestamo: number;
    detalle: [];

}
