import { detallePrestamo } from 'src/detalle-prestamo/entities/detalle-prestamo.entity';
import { Estadoprestamo } from 'src/estadoprestamo/entities/estadoprestamo.entity';
import { Novedades } from 'src/novedades/entities/novedades.entity';
import { Usuarios } from 'src/usuarios/entities/usuarios.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Prestamo {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => detallePrestamo, (detallePrestamo) => detallePrestamo.detalle_prestamo,
        {
            eager: true
        })
    prestamo_detalle: detallePrestamo[];

    @ManyToOne(() => Usuarios, (usuario) => usuario.prestamos_usuario,
        {
            eager: true
        })
    @JoinColumn()
    usuario: Usuarios;

    @ManyToOne(() => Estadoprestamo, (usuario) => usuario.detalle_prestamo,
        {
            eager: true
        })
    estado_prestamo: Estadoprestamo;


    @OneToMany(() => Novedades, (novedades) => novedades.prestamo,
        {
            eager: true

        })
    prestamo: Novedades[];


}
