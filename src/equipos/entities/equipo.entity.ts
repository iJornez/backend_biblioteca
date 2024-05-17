import { detallePrestamo } from 'src/detalle-prestamo/entities/detalle-prestamo.entity';
import { Estadoequipo } from 'src/estadoequipo/entities/estadoequipo.entity';
import { Novedades } from 'src/novedades/entities/novedades.entity';
import { Prestamo } from 'src/prestamos/entities/prestamo.entity';
import { TiposEquipos } from 'src/tipos-equipos/entities/tipos-equipos.entity';
import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Equipo {

  @PrimaryColumn({ type: 'varchar', length: 45 })
  serial: string;


  @Column({ type: 'varchar', nullable: true, default: null })
  codigo_telefonica: string;

  @Column({ type: 'varchar', length: 45 })
  marca: string;

  @ManyToOne(() => Estadoequipo, (estadoequipo) => estadoequipo.estado, { eager: true })
  @JoinColumn()
  estado: Estadoequipo;

  @ManyToOne(() => TiposEquipos, (TiposEquipos) => TiposEquipos.equipo_tipo, { eager: true })
  @JoinColumn()
  tipo: TiposEquipos;

  @OneToMany(() => Novedades, (novedad) => novedad.equipo)
  novedades: Novedades[];


  @OneToMany(() => detallePrestamo, (detalleprestamo) => detalleprestamo.equipo)
  detalle_prestamo: detallePrestamo[];
}
