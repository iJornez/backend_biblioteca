import { PartialType } from '@nestjs/mapped-types';
import { CreatePrestamoDto } from './create-prestamo.dto';
import { IsArray, IsDate, IsNotEmpty } from 'class-validator';
import { Usuarios } from 'src/usuarios/entities/usuarios.entity';
import { detallePrestamo } from 'src/detalle-prestamo/entities/detalle-prestamo.entity';

export class UpdatePrestamoDto extends PartialType(CreatePrestamoDto) {

    @IsNotEmpty()
    readonly id: number;

    @IsDate()
    @IsNotEmpty()
    readonly fecha_prestamo: Date;

    @IsDate()
    @IsNotEmpty()
    readonly fecha_devolucion: Date;

    @IsNotEmpty()
    readonly usuario: Usuarios;

    @IsArray()
    readonly detalle_prestamo: detallePrestamo[];
}
