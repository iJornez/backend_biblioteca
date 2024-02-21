import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoUsuarioDto } from './create-estado_usuario.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateEstadoUsuarioDto extends PartialType(CreateEstadoUsuarioDto) {
    @IsInt()
    @IsNotEmpty()
    id:number;


    
}
