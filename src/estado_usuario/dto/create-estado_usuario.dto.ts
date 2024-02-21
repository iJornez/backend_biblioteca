import { IsNotEmpty, IsString } from "class-validator";
import { Column, PrimaryGeneratedColumn } from "typeorm";

export class CreateEstadoUsuarioDto {
    @IsString()
    @IsNotEmpty()
    @PrimaryGeneratedColumn()    
    id: number;

    @Column()
    estado: string;
}
