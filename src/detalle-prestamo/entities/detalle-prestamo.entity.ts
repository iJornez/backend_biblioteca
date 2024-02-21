import { Equipo } from "src/equipos/entities/equipo.entity";
import { Prestamo } from "src/prestamos/entities/prestamo.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class detallePrestamo {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Equipo, (equipo) => equipo.detalle_prestamo,{
        eager:true
    })
    equipo: Equipo;

    @Column()
    fecha_prestamo : Date;

    @Column()
    fecha_devolucion : Date;

    
    @ManyToOne(() => Prestamo, (detallePrestamo) => detallePrestamo.prestamo_detalle)
    detalle_prestamo: Prestamo;


}