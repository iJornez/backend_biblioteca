import { detallePrestamo } from 'src/detalle-prestamo/entities/detalle-prestamo.entity';
import { Estadoprestamo } from 'src/estadoprestamo/entity/estadoprestamo.entity';
import { Novedades } from 'src/novedades/entities/novedades.entity';
import { Usuarios } from 'src/usuarios/entities/usuarios.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Prestamo {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Usuarios, (usuario) => usuario.prestamos_usuario)
    @JoinColumn()
    usuario: Usuarios;

    @Column()
    fecha_prestamo : Date;

    @Column()
    fecha_devolucion : Date;

    @ManyToOne(() => Estadoprestamo, (usuario) => usuario.detalle_prestamo)
    @JoinColumn()
    estado_prestamo: Estadoprestamo;

  

    @OneToMany(() => Novedades, (novedades) => novedades.prestamo)
    prestamo: Novedades[];

    @OneToMany(() => detallePrestamo, (detallePrestamo) => detallePrestamo.detalle_prestamo, { eager: true })
    prestamo_detalle: detallePrestamo[];
}
