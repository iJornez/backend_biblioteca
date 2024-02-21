import { PartialType } from '@nestjs/mapped-types';
import { CreatePrestamoDto } from './create-prestamo.dto';

export class UpdatePrestamoDto extends PartialType(CreatePrestamoDto) {
    fecha_prestamo: Date;
    fecha_devolucion: Date;
    usuario: string;
    estado_prestamo: number;
    detalle: [];
}
