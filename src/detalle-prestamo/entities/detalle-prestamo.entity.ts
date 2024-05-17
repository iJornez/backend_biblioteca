import { Equipo } from "src/equipos/entities/equipo.entity";
import { Prestamo } from "src/prestamos/entities/prestamo.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class detallePrestamo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'datetime', default: () => 'NOW()' })
    fecha_prestamo: Date;

    @Column({ type: 'datetime', nullable: true })
    fecha_devolucion: Date;

    @ManyToOne(() => Equipo, (equipo) => equipo.detalle_prestamo, {
        eager: true
    })
    equipo: Equipo;

    @ManyToOne(() => Prestamo, (detallePrestamo) => detallePrestamo.prestamo_detalle, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    detalle_prestamo: Prestamo;


}